const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendError } = require('../../helper/util/send');
const { createHelpEmbed } = require('../../helper/util/help');

module.exports = {
    developer: false,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot\'s commands!')
        .setNameLocalizations({
            'de': 'hilfe'
        })
        .addStringOption(option => option
            .setName('command')
            .setDescription('The command to get help with.')
            .setRequired(false)
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        try {
            const command = interaction.options.getString('command');
            let embed = new EmbedBuilder()
                .setColor(client.config.style.colors.blue)

            if (command) {
                const cmd = client.commands.get(command);
                if (!cmd) return sendError('Error', 'That command doesn\'t exist!', interaction, client);
                embed = await createHelpEmbed(client, cmd)
            } else {
                embed.setTitle('VALORANT Wiki Bot Help');
                embed.setDescription('Here are all the commands you can use!');
                for (const command of client.commands) {
                    embed.addFields(
                        { name: command[1].data.name, value: command[1].data.description, inline: true }
                    );
                }
            }
            interaction.editReply({ embeds: [embed] });

        }
        catch (error) {
            sendError('Error', error, interaction, client);
        }
    }
}