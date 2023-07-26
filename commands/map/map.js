const { SlashCommandBuilder } = require("discord.js");
const { getMaps } = require("../../helper/getDataFromAPI");
const { getMapEmbed } = require("../../helper/getEmbed");
const { sleep } = require("../../helper/util/sleep");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("map")
        .setDescription("Send you all information about the defined map")
        .addStringOption(option =>
            option
                .setName("mapname")
                .setDescription("Specify a map.")
                .setRequired(true)
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        const mapName = interaction.options.getString("mapname");
        const maps = await getMaps();
        const mapIndex = maps.findIndex(map => map.displayName.toLowerCase() === mapName.toLowerCase());
        if (!maps[mapIndex]) {
            await interaction.editReply({ content: "That map doesn't exist!", ephemeral: true });
            await sleep(3);
            return interaction.deleteReply();
        }
        const mapEmbed = await getMapEmbed(mapIndex + 1, client);
        interaction.editReply({ embeds: [mapEmbed] });
    }
};


