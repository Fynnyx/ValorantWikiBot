const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { getAgentsRow } = require("../../helper/getActionRow");
const { getAgentEmbed } = require("../../helper/getEmbed");
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agents')
        .setDescription('Get all agents. Click through the agents with buttons.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const page = 1
        console.log(client);
        const agentEmbed = await getAgentEmbed(page, client)
        const row = await getAgentsRow(page)
        interaction.reply({ embeds: [agentEmbed], components: [row] })
    },
};