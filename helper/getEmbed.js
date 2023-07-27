const { EmbedBuilder } = require("discord.js")
const { getEmoji } = require("../helper/getEmoji");
const { getAgents, getMaps, getWeapons } = require("../helper/getDataFromAPI");
const { getWeaponStatTypeString } = require("./weapon/weaponHelper");
const data = require(`${process.cwd()}/properties.json`)

async function getAgentEmbed(page, client) {
    const agentData = await getAgents()
    page = page - 1
    const agentEmbed = new EmbedBuilder()
        .setTitle(`- ${agentData[page].displayName} -`)
        .setURL(`https://playvalorant.com/en-us/agents/${agentData[page].displayName.toLowerCase()}/`)
        .setDescription(`${agentData[page].description}\n\n${client.config.style.linebreak.long}`)
        .setColor(client.config.style.colors.pink)
        .setThumbnail(agentData[page].displayIcon)
        .setImage(agentData[page].killfeedPortrait)
        .setFooter({ text: `${page + 1}/${agentData.length}` })
        .setFields(
            { name: `${agentData[page].role.displayName} ${await getEmoji(agentData[page].role.displayName, client)}`, value: `${agentData[page].role.description}\n\n${client.config.style.linebreak.long}`, inline: false },
        )

    agentData[page].abilities.forEach(async ability => {
        switch (ability.slot.toLowerCase()) {
            case "grenade":
                agentEmbed.addFields(
                    { name: `- ${await getEmoji(agentData[page].displayName.toLowerCase() + "grenade", client)} ${ability.displayName} -`, value: ability.description, inline: true }
                )
                break
            case "ability1":
                agentEmbed.addFields(
                    { name: `- ${await getEmoji(agentData[page].displayName.toLowerCase() + "ability1", client)} ${ability.displayName} -`, value: ability.description, inline: true }
                )
                break;
            case "ability2":
                agentEmbed.addFields(
                    { name: `- ${await getEmoji(agentData[page].displayName.toLowerCase() + "ability2", client)} ${ability.displayName} -`, value: ability.description, inline: true }
                )
                break

            case "ultimate":
                agentEmbed.addFields(
                    { name: `- ${await getEmoji(agentData[page].displayName.toLowerCase() + "ultimate", client)} ${ability.displayName} -`, value: ability.description, inline: true }
                )
                break
        }
    })
    return agentEmbed
}



async function getMapEmbed(page, client) {
    const mapData = await getMaps()
    page = page - 1
    const mapEmbed = new EmbedBuilder()
        .setTitle(`- ${mapData[page].displayName} -`)
        .setURL(`https://playvalorant.com/en-us/maps/`)
        .setDescription(`${mapData[page].coordinates ? mapData[page].coordinates : "*No coordinates available!*"}\n\n${client.config.style.linebreak.long}`)
        .setColor(client.config.style.colors.pink)
        .setImage(mapData[page].listViewIcon)
        .setThumbnail(mapData[page].displayIcon)
        .setFooter({ text: `${page + 1}/${mapData.length}` })
    return mapEmbed
}


async function getWeaponEmbed(page, skinpage, chromapage, client) {
    const weaponData = await getWeapons()
    page = page - 1
    skinpage = skinpage - 1
    chromapage = chromapage - 1

    weapon = weaponData[page]

    const weaponEmbed = new EmbedBuilder()
        .setTitle(`- ${weapon.displayName} (${getWeaponStatTypeString(weapon.category).value}) -`)
        .setURL(`https://playvalorant.com/en-us/arsenal`)
        .setDescription(`${client.config.style.linebreak.long}`)
        .setColor(client.config.style.colors.pink)
        .setThumbnail(weapon.displayIcon)

        .addFields(
            (weapon.weaponStats ? {
                name: `Weapon Stats`,
                inline: true,
                value: ` \
                Fire Rate: \`${weapon.weaponStats.fireRate}\`\n \
                Magazine Size: \`${weapon.weaponStats.magazineSize}\`\n \
                Equip Time: \`${weapon.weaponStats.equipTimeSeconds}\`\n \
                Reload Time: \`${weapon.weaponStats.reloadTimeSeconds}\`\n
                Shotgun Pellet Count: \`${weapon.weaponStats.shotgunPelletCount}\`\n \
                First Bullet Accuracy: \`${weapon.weaponStats.firstBulletAccuracy}\`\n \
                Wall Penetration: \`${(getWeaponStatTypeString(weapon.weaponStats.wallPenetration)).value}\`\n \
                Feature: \`${(getWeaponStatTypeString(weapon.weaponStats.feature)).value}\`\n \
                Fire Mode: \`${(getWeaponStatTypeString(weapon.weaponStats.fireMode)).value}\`\n \
                Alt Fire: \`${(getWeaponStatTypeString(weapon.weaponStats.altFire)).value}\`\n \
                ` }
                : { name: `Weapon Stats`, value: `*No stats available for this weapon!*` }),
                (
                    weapon.weaponStats?.damageRanges ? {
                        name: `Damage Ranges`, 
                        inline: true,
                        value: weapon.weaponStats.damageRanges.map(damageRange => {
                            return `> **Range: ${damageRange.rangeStartMeters}m - ${damageRange.rangeEndMeters}m**\n \
                                > Head Damage: \`${damageRange.headDamage}\`\n \
                                > Body Damage: \`${damageRange.bodyDamage}\`\n \
                                > Leg Damage: \`${damageRange.legDamage}\`\n \
                                ${client.config.style.linebreak.medium}`;
                        }).join("\n")
                    } : { name: `Damage Ranges`, value: `*No damage ranges available for this weapon!*` }
                ),
                

            (weapon.shopData ? {
                name: `Shop Data`,
                inline: false,
                value: ` \
                Cost: \`${weapon.shopData.cost}\`\n \
                Category: \`${(getWeaponStatTypeString(weapon.shopData.category)).value ? (getWeaponStatTypeString(weapon.shopData.category)).value : "Not category set!" }\`\n \
                Category Text: \`${weapon.shopData.categoryText}\`\n \
                Grid Position: \`${weapon.shopData.gridPosition?.row}:${weapon.shopData.gridPosition?.column}\`\n \
                ` }
                : { name: `Shop Data`, value: `*No shop data available for this weapon!*` }),
        )

        .addFields(
            {
                name: `Skin: ${weapon.skins[skinpage].displayName}`,
                inline: false,
                value: `Levels: \`${weapon.skins[skinpage].levels.length}\`\n \
                        Chromas: \`${weapon.skins[skinpage].chromas.length}\`\n\n${client.config.style.linebreak.long}`, inline: false
            },
        )
        .setImage(
            // If page is 0, then display the weapon skin displayIcon, else display the chroma displayIcon
            chromapage === -1 ? weapon.skins[skinpage].displayIcon :
                weapon.skins[skinpage]?.chromas[chromapage]?.displayIcon ? weapon.skins[skinpage].chromas[chromapage].displayIcon : weapon.skins[skinpage].displayIcon
        )
        .setFooter({ text: `${page + 1}/${weaponData.length};${skinpage + 1}/${weapon.skins.length};${weapon.skins[skinpage].chromas.length === 1 ? '1' : chromapage + 1}/${weapon.skins[skinpage].chromas.length}` })
    return weaponEmbed
}

module.exports = {
    getAgentEmbed,
    getMapEmbed,
    getWeaponEmbed
}

