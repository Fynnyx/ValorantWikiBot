const client = require("../index");
const data = require(`${process.cwd()}/properties.json`)

exports.getEmoji = async (name, client) => {
    const guild = client.guilds.cache.get(data.emojiGuild);
    var emoji = guild.emojis.cache.find(e => e.name === name.toLowerCase().replace("/", ""));
    return emoji
}