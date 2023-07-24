const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js")
const { getMaps, getAgents } = require("../../helper/getDataFromAPI")
const { getMapEmbed, getAgentEmbed } = require("../../helper/getEmbed")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Get a random map, agent or weapon.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("map")
                .setDescription("Get a random map.")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("agent")
                .setDescription("Get a random agent.")
                .addStringOption(option =>
                    option
                        .setName("role")
                        .setDescription("Specify a role.")
                        .setRequired(false)
                        .addChoices(
                            { name: "Duelist", value: "Duelist" },
                            { name: "Initiator", value: "Initiator" },
                            { name: "Controller", value: "Controller" },
                            { name: "Sentinel", value: "Sentinel" },
                        )

                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("weapon")
                .setDescription("Get a random weapon.")
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case "map":
                const mapData = await getMaps()
                var mapIndex = Math.floor(Math.random() * mapData.length)
                var map = mapData[mapIndex]
                while (data.commands.random.disabledMaps.includes(map.displayName)) {
                    mapIndex = Math.floor(Math.random() * mapData.length)
                    map = mapData[mapIndex]
                }
                const mapEmbed = await getMapEmbed(mapIndex)
                interaction.reply({ embeds: [mapEmbed] })
                break;

            case "agent":
                const agentData = await getAgents()
                var agentIndex = Math.floor(Math.random() * agentData.length)
                var agent = agentData[agentIndex]
                if (args[1] !== undefined) {
                    while (agent.role.displayName !== args[1]) {
                        agentIndex = Math.floor(Math.random() * agentData.length)
                        agent = agentData[agentIndex]
                    }
                }
                const agentEmbed = await getAgentEmbed(agentIndex + 1)
                interaction.reply({ embeds: [agentEmbed] })
                break;

            case "weapon":

                break;

            default:
                interaction.reply("Ich habe keine Ahnung was du meinst.")

        }
    }
}
