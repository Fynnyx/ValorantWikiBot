const axios = require('axios'); 
const { MessageActionRow, MessageButton } = require("discord.js")
const { getAgents } = require("../helpers/getDataFromAPI")
const { setTimeout } = require("discord.js")

exports.getAgentsRow = async (page) => {
    const agentData = await getAgents()

    if (page === 1) {
        var downdisabled = true
        var updisabled = false
    } else if (page === agentData.length) {
        var downdisabled = false
        var updisabled = true
    } else {
        var downdisabled = false
        var updisabled = false
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`agentsdown`)
                .setLabel(`« Down`)
                .setStyle(`PRIMARY`)
                .setDisabled(downdisabled),
            new MessageButton()
                .setCustomId(`agentsup`)
                .setLabel(`Up »`)
                .setStyle(`PRIMARY`)
                .setDisabled(updisabled),
        )
    return row
}