const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js")
const { getMaps, getAgents, getWeapons } = require("../../helper/getDataFromAPI")
const { getMapEmbed, getAgentEmbed, getWeaponEmbed } = require("../../helper/getEmbed")
const { filterTDMMaps } = require("../../helper/map/mapHelper")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Get a random map, agent or weapon.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("map")
                .setDescription("Get a random map.")
                .addBooleanOption(option =>
                    option
                        .setName("include-tdm")
                        .setDescription("Include Team Deathmatch maps.")
                        .setRequired(false)
                )
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
                .addBooleanOption(option =>
                    option
                        .setName("include-melee")
                        .setDescription("Include the knife as weapon.")
                        .setRequired(false)
                )
                .addNumberOption(option =>
                    option
                        .setName("max-credits")
                        .setDescription("Specify the maximum credits.")
                        .setRequired(false)
                )
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case "map":
                const includeTDM = interaction.options.getBoolean("include-tdm")
                let mapData = await getMaps()
                const allMaps = mapData
                if (includeTDM === false) {
                    mapData = await filterTDMMaps(client, mapData)
                }
                var mapIndex = Math.floor(Math.random() * mapData.length)
                var map = mapData[mapIndex]
                while (client.config.commands.random.disabledMaps.includes(map.displayName)) {
                    mapIndex = Math.floor(Math.random() * mapData.length)
                    map = mapData[mapIndex]
                }
                const mapEmbed = await getMapEmbed(allMaps.indexOf(map) + 1, client)
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
                const agentEmbed = await getAgentEmbed(agentIndex + 1, client)
                interaction.reply({ embeds: [agentEmbed] })
                break;

            case "weapon":
                const includeMelee = interaction.options.getBoolean("include-melee")
                const maxCredits = interaction.options.getNumber("max-credits")
                const weaponData = await getWeapons()
                var weaponIndex = Math.floor(Math.random() * weaponData.length)
                var weapon = weaponData[weaponIndex]
                if (includeMelee === false) {
                    weaponData.splice(weaponData.findIndex(weapon => weapon.displayName === "Melee"), 1)
                }
                if (maxCredits !== undefined) {
                    weaponData.splice(weaponData.findIndex(weapon => weapon.shopData.cost > maxCredits), 1)
                }
                weaponIndex = Math.floor(Math.random() * weaponData.length)
                weapon = weaponData[weaponIndex]
                const weaponEmbed = getWeaponEmbed(weaponIndex + 1, 1, 0, client)
                interaction.reply({ embeds: [weaponEmbed] })
                break;

            default:
                interaction.reply("Ich habe keine Ahnung was du meinst.")

        }
    }
}
