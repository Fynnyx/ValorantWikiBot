const { SlashCommandBuilder } = require("discord.js");
const { getWeaponEmbed } = require("../../helper/getEmbed");
const { getWeaponsRow } = require("../../helper/getActionRow");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weapons")
        .setDescription("Get all weapons."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const page = 1
        const skinpage = 1
        const chromapage = 0
        const weaponEmbed = await getWeaponEmbed(page, skinpage, chromapage, client);
        const [weaponRow, skinRow] = await getWeaponsRow(page, skinpage, client);
        interaction.reply({ embeds: [weaponEmbed], components: [weaponRow, skinRow] })
    }
}