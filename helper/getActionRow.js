const axios = require('axios');
const { MessageButton, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { getAgents, getMaps, getWeapons } = require("../helper/getDataFromAPI")
const { setTimeout } = require("discord.js")

exports.getAgentsRow = async (page) => {
    const agentData = await getAgents()
    return await this.generateRow(page, agentData, "agents")
}

exports.getMapsRow = async (page) => {
    const mapData = await getMaps()
    return await this.generateRow(page, mapData, "maps")
}

exports.getWeaponsRow = async (page, skinpage, chromapage) => {
    const weaponData = await getWeapons()
    const weaponRow = await this.generateRow(page, weaponData, "weapons")

    let id = "skins"
    let list = weaponData[page - 1].skins
    if (skinpage === 1) {
        var downdisabled = true
        var updisabled = false
    } else if (skinpage === list.length) {
        var downdisabled = false
        var updisabled = true
    } else {
        var downdisabled = false
        var updisabled = false
    }

    const skinRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`${id}down`)
                .setLabel(`« Skin Down`)
                .setStyle(ButtonStyle.Danger)
                .setDisabled(downdisabled),
            new ButtonBuilder()
                .setCustomId(`${id}up`)
                .setLabel(`Skin Up »`)
                .setStyle(ButtonStyle.Danger)
                .setDisabled(updisabled),
        )
    id = "chromas"
    list = weaponData[page - 1].skins[skinpage - 1].chromas
    if (list.length <= 1) {
        var downdisabled = true
        var updisabled = true
    } else if (chromapage === 0 || (chromapage === 1 && list.length === 1)) {
        var downdisabled = true
        var updisabled = false
    } else if (chromapage === list.length) {
        var downdisabled = false
        var updisabled = true
    } else {
        var downdisabled = false
        var updisabled = false
    }
    const chromaRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`chromasdown`)
                .setLabel(`« Chroma Down`)
                .setStyle(ButtonStyle.Success)
                .setDisabled(downdisabled),
            new ButtonBuilder()
                .setCustomId(`chromasup`)
                .setLabel(`Chroma Up »`)
                .setStyle(ButtonStyle.Success)
                .setDisabled(updisabled),
        )
    return [weaponRow, skinRow, chromaRow]
}

exports.generateRow = async (page, list, id) => {

    if (page === 1) {
        var downdisabled = true
        var updisabled = false
    } else if (page === list.length) {
        var downdisabled = false
        var updisabled = true
    } else {
        var downdisabled = false
        var updisabled = false
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`${id}down`)
                .setLabel(`« Down`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(downdisabled),
            new ButtonBuilder()
                .setCustomId(`${id}up`)
                .setLabel(`Up »`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(updisabled),
            new ButtonBuilder()
                .setCustomId(`${id}page`)
                .setLabel(`Pager (coming soon)`)
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
        )
    return row
}