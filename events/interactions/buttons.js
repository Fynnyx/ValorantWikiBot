const { getAgentEmbed, getMapEmbed, getWeaponEmbed } = require("../../helper/getEmbed");
const { getAgentsRow, getMapsRow, getWeaponsRow } = require("../../helper/getActionRow");
const { sleep } = require("../../helper/util/sleep")

const KEYWORDS = ["up", "down", "page"]

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (!KEYWORDS.some(keyword => interaction.customId.toLowerCase().endsWith(keyword))) return
            const keyword = KEYWORDS.find(keyword => interaction.customId.toLowerCase().endsWith(keyword))
            const command = interaction.customId.slice(0, -keyword.length)
            switch (keyword) {
                case "down":
                    await interaction.deferReply({ ephemeral: false });
                    let downPage, downEmbed, downRow, downMsg;

                    switch (command) {
                        case "agents":
                            downPage = parseInt(interaction.message.embeds[0].footer.text.split("/", 1)[0]);
                            downEmbed = await getAgentEmbed(downPage - 1, client);
                            downRow = await getAgentsRow(downPage - 1);
                            break;
                        case "maps":
                            downPage = parseInt(interaction.message.embeds[0].footer.text.split("/", 1)[0]);
                            downEmbed = await getMapEmbed(downPage - 1, client);
                            downRow = await getMapsRow(downPage - 1);
                            break;
                        case "weapons":
                        case "skins":
                        case "chromas":
                            let isSkin = command === "skins";
                            let isChroma = command === "chromas";
                            let downMessage = interaction.message.embeds[0].footer.text.split(";");
                            downPage = parseInt(downMessage[0].split("/", 1)[0]);
                            let downSkinPage = parseInt(downMessage[1].split("/", 1)[0]);
                            let downSkinChromaPage = parseInt(downMessage[2].split("/", 1)[0]);

                            if (isSkin) {
                                downEmbed = await getWeaponEmbed(downPage, downSkinPage - 1, 0, client);
                                downRow = await getWeaponsRow(downPage, downSkinPage - 1, 0);
                            } else if (isChroma) {
                                downEmbed = await getWeaponEmbed(downPage, downSkinPage, downSkinChromaPage - 1, client);
                                downRow = await getWeaponsRow(downPage, downSkinPage, downSkinChromaPage - 1);
                            } else {
                                downEmbed = await getWeaponEmbed(downPage - 1, 1, 0, client);
                                downRow = await getWeaponsRow(downPage - 1, 1, 0);
                            }

                            interaction.message.edit({ embeds: [downEmbed], components: downRow });

                            if (!interaction.replied) {
                                downMsg = await interaction.editReply({ content: "Page Switched", fetchReply: true, ephemeral: true });
                            }
                            downMsg.delete();
                            return;
                    }

                    interaction.message.edit({ embeds: [downEmbed], components: [downRow] })
                    if (!interaction.replied) {
                        downMsg = await interaction.editReply({ content: "Page Switched", fetchReply: true, ephemeral: true })
                    }
                    downMsg.delete()
                    break

                case "up":
                    await interaction.deferReply({ ephemeral: false })
                    let upPage = parseInt(interaction.message.embeds[0].footer.text.split("/", 1)[0])
                    let upEmbed
                    let upRow
                    switch (command) {
                        case "agents":
                            upEmbed = await getAgentEmbed(upPage + 1, client)
                            upRow = await getAgentsRow(upPage + 1)
                            break
                        case "maps":
                            upEmbed = await getMapEmbed(upPage + 1, client)
                            upRow = await getMapsRow(upPage + 1)
                            break
                        case "weapons":
                        case "skins":
                        case "chromas":
                            let isSkin = command === "skins";
                            let isChroma = command === "chromas";
                            let upMessage = interaction.message.embeds[0].footer.text.split(";");
                            upPage = parseInt(upMessage[0].split("/", 1)[0]);
                            let upSkinPage = parseInt(upMessage[1].split("/", 1)[0]);
                            let upSkinChromaPage = parseInt(upMessage[2].split("/", 1)[0]);

                            if (isSkin) {
                                upEmbed = await getWeaponEmbed(upPage, upSkinPage + 1, 0, client);
                                upRow = await getWeaponsRow(upPage, upSkinPage + 1, 0, client);
                            } else if (isChroma) {
                                upEmbed = await getWeaponEmbed(upPage, upSkinPage, upSkinChromaPage + 1, client);
                                upRow = await getWeaponsRow(upPage, upSkinPage, upSkinChromaPage + 1, client);
                            }
                            else {
                                upEmbed = await getWeaponEmbed(upPage + 1, 1, 0, client);
                                upRow = await getWeaponsRow(upPage + 1, 1, 0);
                            }

                            interaction.message.edit({ embeds: [upEmbed], components: upRow });

                            var upMsg;
                            if (!interaction.replied) {
                                upMsg = await interaction.editReply({ content: "Page Switched", fetchReply: true, ephemeral: true });
                            }
                            upMsg.delete();
                            return;
                    }
                    interaction.message.edit({ embeds: [upEmbed], components: [upRow] })
                    var upMsg
                    if (!interaction.replied) {
                        upMsg = await interaction.editReply({ content: "Page Switched", fetchReply: true, ephemeral: true })
                    }
                    upMsg.delete()
                    break
                case "page":
                    await interaction.deferReply({ ephemeral: false })
                    await interaction.editReply({ content: "What page do you want to go to?", fetchReply: true, ephemeral: true })
                    const collector = interaction.channel.createMessageComponentCollector({
                        filter: (msg) => msg.user.id === interaction.user.id,
                        time: 10 * 1000,
                        max: 1
                    });
                    collector.on('collect', async (msg) => {
                        // Check if the message is a number
                        if (isNaN(msg.content)) {
                            return msg.reply({ content: "That's not a number!", ephemeral: true })
                        }
                        var page = parseInt(msg.content)
                        interaction.message.edit({ embeds: [await getAgentEmbed(page, client)], components: [await getAgentsRow(page)] })
                        var agentsPageMsg
                        if (!interaction.replied) {
                            agentsPageMsg = await interaction.editReply({ content: "Page Switched", fetchReply: true, ephemeral: false })
                        }
                        agentsPageMsg.delete()
                    })
                    collector.on('end', async (collected, reason) => {
                        if (reason === 'time') {
                            interaction.editReply({ content: "You didn't reply in time!", ephemeral: true })
                            await sleep(3)
                            interaction.deleteReply()
                        }
                    })
                    break
            }
        }
    }

}