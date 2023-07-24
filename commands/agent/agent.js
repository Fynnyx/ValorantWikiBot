const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agent')
        .setDescription('Send you all information about the defined agent')
        .addStringOption(option => option.setName('agentname').setDescription('Specify an agent.').setRequired(true)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {}
}