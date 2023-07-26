const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")
const dotenv = require("dotenv")

const { loadEvents } = require("./loader/eventHandler")


dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages
	],
	partials: [
		Partials.User,
		Partials.Message,
		Partials.GuildMember,
		Partials.ThreadMember
	],
});

client.config = require("./properties.json")
client.events = new Collection()
client.commands = new Collection()

// Load events, commands
loadEvents(client)


client.login(process.env.TOKEN)
