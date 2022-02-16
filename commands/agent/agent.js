const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { writeFile } = require("fs")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "agent",
    description: "Send you all information about the defined agent",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "agentname",
            type: "STRING",
            description: "Specify an agent.",
            required: true
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
            
    }
}