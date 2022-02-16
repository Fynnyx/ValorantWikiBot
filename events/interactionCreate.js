const client = require('../index.js')
const { getAgentEmbed } = require("../helpers/getEmbed");
const { getAgentsRow } = require("../helpers/getActionRow");
const { sleep } = require('../helpers/sleep.js');


client.on('interactionCreate', async interaction => {
	// DONT CHANGE THIS CODE
	// It calls the right SlashCommand run function.
	if (interaction.isCommand()) {

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd)
			return interaction.followUp({ content: "An error has occured " });

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
		}
		interaction.member = interaction.guild.members.cache.get(interaction.user.id);

		cmd.run(client, interaction, args);
	}

	if (interaction.isButton()) {
		switch (interaction.customId.toLowerCase()) {
			case "agentsdown":
				let agentsDownPage = parseInt(interaction.message.embeds[0].footer.text.split("/", 1)[0])
				interaction.message.edit({ embeds: [await getAgentEmbed(agentsDownPage - 1)], components: [await getAgentsRow(agentsDownPage - 1)] })
				var agentsDownMsg
				if (!interaction.replied) {
					agentsDownMsg = await interaction.reply({ content: "Page Switched", fetchReply: true })
				}
				if (!interaction === undefined) {
					agentsDownMsg.delete()
				}
				break

			case "agentsup":
				let agentsUpPage = parseInt(interaction.message.embeds[0].footer.text.split("/", 1)[0])
				interaction.message.edit({ embeds: [await getAgentEmbed(agentsUpPage + 1)], components: [await getAgentsRow(agentsUpPage + 1)] })
				var agentsUpMsg
				if (!interaction.replied) {
					agentsUpMsg = await interaction.reply({ content: "Page Switched", fetchReply: true })
				}
				agentsUpMsg.delete()
				break
		}
	}
	// --> Here you can go on.
});