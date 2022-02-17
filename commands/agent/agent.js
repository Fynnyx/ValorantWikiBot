const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { writeFile } = require("fs")
const { getAgents } = require("../../helpers/getDataFromAPI")
const data = require(`${process.cwd()}/properties.json`)

var agentOptions = []
getAgents()
    .then(agentData => {
        agentData.forEach(agent => {
            let agentOption = {
                name: agent.displayName,
                value: agent.displayName,
            }
            agentOptions.push(agentOption)
        })
    })

module.exports = {
    name: "agent",
    description: "Send you all information about the defined agent",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "agentname",
            type: "STRING",
            description: "Specify an agent.",
            required: true,
            choices: agentOptions,
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        console.log(args);
        interaction.reply("Loading...")
    }
}