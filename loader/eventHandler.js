
async function loadEvents(client) {
    const { loadFiles } = require('../helper/fileLoader');
    const { AsciiTable3 } = require('ascii-table3');
    const asciiTable = new AsciiTable3("Events");
    asciiTable.setHeading("Event", "Usage", "Load status");
    
    // Clear the events collection
    await client.events.clear();

    const files = await loadFiles('events');
    console.log(files);
    for (const file of files) {
        try {
            const event = require(file);

            const execute = (...args) => event.execute(...args, client);
            client.events.set(event.name, execute);

            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, execute);
                } else {
                    client.rest.on(event.name, execute);
                }
            } else {
                if (event.once) {
                    client.once(event.name, execute);
                } else {
                    client.on(event.name, execute);
                }
            }
            asciiTable.addRow(event.name, event.usage, "✅");
        } catch (err) {
            console.error(err);
            const path = file.split('/');
            const fileName = path[path.length - 1];
            asciiTable.addRow(fileName, "!! Error occured !!", `❌ -> ${err.message}`);
        }
    }
    console.info(asciiTable.toString());
}

module.exports = { loadEvents };