const { SlashCommandBuilder } = require("discord.js");
const { getMapEmbed } = require("../../helper/getEmbed");
const { getMapsRow } = require("../../helper/getActionRow");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("maps")
        .setDescription("Get all maps."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const page = 1
        const mapEmbed = await getMapEmbed(page, client)
        const row = await getMapsRow(page)
        interaction.reply({ embeds: [mapEmbed], components: [row] })
    }
}