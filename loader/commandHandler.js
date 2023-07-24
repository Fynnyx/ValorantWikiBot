async function loadCommands(client) {
    const { loadFiles } = require('../helper/fileLoader');
    const { AsciiTable3 } = require('ascii-table3');
    const asciiTable = new AsciiTable3(`Commands ${client.commands.size}`);
    asciiTable.setHeading("Command", "Description", "Load status")

    // Clear the commands collection
    await client.commands.clear();

    let commandsArray = [];

    const files = await loadFiles('commands');

    for (const file of files) {
        try {
            const command = require(file);
            if (!command.data) continue;
            client.commands.set(command.data.name, command);
            commandsArray.push(command.data.toJSON());
            asciiTable.addRow(command.data.name, command.data.description, "✅");
        } catch (err) {
            console.error(err);
            const filePathArray = file.split("/")
            const fileName = filePathArray[filePathArray.length - 1];
            asciiTable.addRow(fileName, "!! Error occured !!", `❌ -> ${err.message}`);
        }
    }
    client.application.commands.set(commandsArray);
    asciiTable.setTitle(`Commands ${client.commands.size}`);
    console.info(asciiTable.toString());
    return;
}

module.exports = { loadCommands };