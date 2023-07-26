const client = require("../index");
const data = require(`${process.cwd()}/properties.json`)

exports.getEmoji = async (name, client) => {
    const guild = await client.guilds.fetch(client.config.emojiGuild)
    var emoji = guild.emojis.cache.find(e => e.name === name.toLowerCase().replace("/", ""));
    return emoji
}