const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { getAgents } = require('../../helper/getDataFromAPI');
const { getAgentEmbed } = require('../../helper/getEmbed');
const { sleep } = require('../../helper/util/sleep');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agent')
        .setDescription('Send you all information about the defined agent')
        .addStringOption(option => option.setName('agentname').setDescription('Specify an agent.').setRequired(true)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        const agentName = interaction.options.getString('agentname');
        const agents = await getAgents();
        const agentIndex = agents.findIndex(agent => agent.displayName.toLowerCase() === agentName.toLowerCase());
        if (!agents[agentIndex]) {
            await interaction.editReply({ content: 'That agent doesn\'t exist!', ephemeral: true })
            await sleep(3);
            return interaction.deleteReply();
        };
        const agentEmbed = await getAgentEmbed(agentIndex + 1, client);
        interaction.editReply({ embeds: [agentEmbed] });
    }
}