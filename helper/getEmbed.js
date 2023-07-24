const { EmbedBuilder } = require("discord.js")
const { getEmoji } = require("../helper/getEmoji");
const { getAgents, getMaps } = require("../helper/getDataFromAPI");
const data = require(`${process.cwd()}/properties.json`)

exports.getAgentEmbed = async (page, client) => {
    const agentData = await getAgents()
    page = page - 1
    const agentEmbed = new EmbedBuilder()
        .setTitle(`- ${agentData[page].displayName} -`)
        .setURL(`https://playvalorant.com/en-us/agents/${agentData[page].displayName.toLowerCase()}/`)
        .setDescription(`${agentData[page].description}\n\n${data.style.linebreak}`)
        .setColor(data.style.style.colors.pink)
        .setThumbnail(agentData[page].displayIcon)
        .setImage(agentData[page].killfeedPortrait)
        .setFooter({ text: `${page + 1}/${agentData.length}` })
        .setFields(
            { name: `${agentData[page].role.displayName} ${await getEmoji(agentData[page].role.displayName)}`, value: `${agentData[page].role.description}\n\n${data.style.linebreak}`, inline: false },
        )

    agentData[page].abilities.forEach(async ability => {
        switch (ability.slot.toLowerCase()) {
            case "grenade":
                agentEmbed.addField(`- ${await getEmoji(agentData[page].displayName.toLowerCase() + "grenade", client)} ${ability.displayName} -`, ability.description, true)
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

exports.getMapEmbed = async (page) => {
    const mapData = await getMaps()
    page = page - 1
    const mapEmbed = new MessageEmbed()
        .setTitle(`- ${mapData[page].displayName} -`)
        .setURL(`https://playvalorant.com/en-us/maps/`)
        .setDescription(`${mapData[page].coordinates}\n\n${data.style.linebreak}`)
        .setColor(data.style.style.colors.pink)
        .setImage(mapData[page].listViewIcon)
        .setThumbnail(mapData[page].displayIcon)
        .setFooter({ text: `${page + 1}/${mapData.length}` })
    return mapEmbed
}