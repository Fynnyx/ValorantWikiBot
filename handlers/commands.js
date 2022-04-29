const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

const { Client } = require("discord.js")

/**
 * 
 * @param { Client } client 
 */

// Register all SlashCOmmands declared in ../commands
module.exports = async (client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // -- Register for a single guild
        const guild = client.guilds.cache.get("912666151576805427")
        // await guild.commands.set(arrayOfSlashCommands)

        // -- Register for all the guilds the bot is in (can take up to a hour to let them work.)
        await client.application.commands.set(arrayOfSlashCommands)
    });
}