const client = require("../index.js")
const data = require(`${process.cwd()}/properties.json`)


client.on("ready", () => {
    console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in\x1b[0m`)
    client.user.setActivity({ type: "WATCHING", name: data.events.status.message })
})