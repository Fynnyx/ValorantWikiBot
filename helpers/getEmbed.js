const { MessageEmbed } = require("discord.js")
const { getEmoji } = require("../helpers/getEmoji");
const { getAgents } = require("../helpers/getDataFromAPI");
const data = require(`${process.cwd()}/properties.json`)

exports.getAgentEmbed = async (page) => {
    const agentData = await getAgents()
    page = page - 1
    const agentEmbed = new MessageEmbed()
        .setTitle(`- ${agentData[page].displayName} -`)
        .setURL(`https://playvalorant.com/en-us/agents/${agentData[page].displayName.toLowerCase()}/`)
        .setDescription(`${agentData[page].description}\n\n${data.style.linebreak}`)
        .setColor(data.style.colors.pink)
        .setThumbnail(agentData[page].displayIcon)
        .setImage(agentData[page].killfeedPortrait)
        .setFooter({ text: `${page + 1}/${agentData.length}` })
        .setFields(
            { name: `${agentData[page].role.displayName} ${await getEmoji(agentData[page].role.displayName)}`, value: `${agentData[page].role.description}\n\n${data.style.linebreak}`, inline: false },
        )

    agentData[page].abilities.forEach(async ability => {
        switch (ability.slot.toLowerCase()) {
            case "grenade":
                agentEmbed.addField(`- ${await getEmoji(agentData[page].displayName.toLowerCase() + "grenade")} ${ability.displayName} -`, ability.description, true)
                break
            case "ability1":
                agentEmbed.addField(`- ${await getEmoji(agentData[page].displayName.toLowerCase() + "ability1")} ${ability.displayName} -`, ability.description, true)
                break;
            case "ability2":
                agentEmbed.addField(`- ${await getEmoji(agentData[page].displayName.toLowerCase() + "ability2")} ${ability.displayName} -`, ability.description, true)
                break
            
            case "ultimate":
                agentEmbed.addField(`Ultimate: ${await getEmoji(agentData[page].displayName.toLowerCase() + "ult")} ${ability.displayName}`, ability.description, false)
                break
        }
    })
    return agentEmbed
}