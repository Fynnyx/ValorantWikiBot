const { Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const { getAgentsRow } = require("../../helpers/getActionRow");
const { getAgentEmbed } = require("../../helpers/getEmbed");
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "agents",
    description: "Get all agents. Click through the agents with buttons.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const page = 1
        const agentEmbed = await getAgentEmbed(page)
        const row = await getAgentsRow(page)
        interaction.reply({ embeds: [agentEmbed], components: [row] })
        // await interaction.reply({ content: `Command1 has been triggered.`, ephemeral: true })
    },
};