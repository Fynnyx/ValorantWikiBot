const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getMaps, getAgents } = require("../../helpers/getDataFromAPI")
const { getMapEmbed, getAgentEmbed } = require("../../helpers/getEmbed")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "random",
    description: "Get a random map, agent or weapon.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "map",
            type: "SUB_COMMAND",
            description: "Get a random map.",
        },
        {
            name: "agent",
            type: "SUB_COMMAND",
            description: "Get a random agent.",
            options: [
                {
                    name: "role",
                    type: "STRING",
                    description: "Specify a role.",
                    required: false,
                    choices: [
                        { name: "Duelist", value: "Duelist" },
                        { name: "Controller", value: "Controller" },
                        { name: "Initiator", value: "Initiator" },
                        { name: "Sentinel", value: "Sentinel" },
                    ]
                }
            ]
        },
        {
            name: "weapon",
            type: "SUB_COMMAND",
            description: "Get a random weapon.",
        }
    ],



    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        switch (args[0].toLowerCase()) {
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
