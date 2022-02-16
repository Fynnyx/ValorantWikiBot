const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "help",
    description: "Get help for the diffrent commands and about the bot.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let helpEmbed = new MessageEmbed()
            .setTitle(`Hilfe für den ${client.user.tag}`)
            .setDescription(`Dieser Bot überwacht den <#${data.channel}>-Channel auf falschen Input oder ähnliches. Bitte halte dich an die Regeln. Danke.\nDer Bot benutzt **SlashCommands**.\n\n--------------------------------`)
            .setColor("#00fff2")
            .setTimestamp()
            .setFooter("By Fynnyx | github.com/Fynnyx")
            
            client.slashCommands.map(value => {
                helpEmbed.addField(value.name, value.description, true)
            })
        
        await interaction.reply({ embeds: [helpEmbed] })    }
}