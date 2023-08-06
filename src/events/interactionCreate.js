module.exports = async (bot, interaction) => {
    const { EmbedBuilder, InteractionType } = require('discord.js'),
        fs = require('fs'),
        { getSlashID } = require("../functions/base"),
        { translate } = require('../functions/translations'),
        { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    if (interaction.type === InteractionType.MessageComponent) {
        if (interaction.customId === "cmdHelpChat") {
            let cmdHelpChatDesc, chatCmds = [];
            cmdHelpChatDesc = await translate("commands.help.chatCmds.description", interaction.guild);
            const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
            for (const command of commandsFolder) {
                const commandFile = require(__dirname + `/../commands/${command}`);
                if (commandFile.config.enableChat) {
                    let cmdChatListLine;
                    cmdChatListLine = await translate("commands.help.chatCmds.chatCmdList", interaction.guild);
                    cmdChatListLine = cmdChatListLine.replaceAll("{cmdName}", commandFile.config.name ? commandFile.config.name : command.split(".js")[0]);
                    cmdChatListLine = cmdChatListLine.replaceAll("{cmdDescription}", commandFile.config.description ? commandFile.config.description : "");
                    chatCmds.push(cmdChatListLine);
                }
            }
            cmdHelpChatDesc = cmdHelpChatDesc.replaceAll("{chatCmdList}", chatCmds.join("\n"));

            const cmdHelpChatEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(await translate("commands.help.chatCmds.title", interaction.guild))
                .setDescription(cmdHelpChatDesc)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [cmdHelpChatEmbed], ephemeral: true });
        }

        if (interaction.customId === "cmdHelpSlash") {
            let cmdHelpSlashDesc, slashCmds = [];
            cmdHelpSlashDesc = await translate("commands.help.slashCmds.description", interaction.guild);
            const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
            for (const command of commandsFolder) {
                const commandFile = require(__dirname + `/../commands/${command}`);
                if (commandFile.config.enableSlash) {
                    let cmdSlashListLine;
                    cmdSlashListLine = await translate("commands.help.slashCmds.slashCmdList", interaction.guild);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdName}", commandFile.config.name ? commandFile.config.name : command.split(".js")[0]);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdSlashMention}", `</${commandFile.slash.name}:${await getSlashID(bot, commandFile.slash.name)}>`);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdDescription}", commandFile.config.description ? commandFile.config.description : "");
                    slashCmds.push(cmdSlashListLine);
                }
            }
            cmdHelpSlashDesc = cmdHelpSlashDesc.replaceAll("{slashCmdList}", slashCmds.join("\n"));

            const cmdHelpSlashEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(await translate("commands.help.slashCmds.title", interaction.guild))
                .setDescription(cmdHelpSlashDesc)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [cmdHelpSlashEmbed], ephemeral: true });
        }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = bot.slashes.get(interaction.commandName);
        if (command) {
            if (config.settings.randomColor) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                if (randomColor === config.embeds.color) {
                    config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
                } else {
                    config.embeds.color = randomColor;
                }

                if (config.embeds.color.length === 5) {
                    config.embeds.color = config.embeds.color + "0";
                }
            }

            command.run(bot, "slash", interaction, undefined);
        }
    }

    //SUROCRAFT CHANGES ↓ ↓ ↓
    const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
    const { isButtonAuthor } = require('../functions/surocraft');

    if (interaction.type === InteractionType.MessageComponent) {
        if (interaction.customId === "vote") {
            nickname = interaction.member.displayName;
            c =
                `**Hlasování pro SuroCraft:**\nVygenerováno pro: **\`${nickname}\`**
                > :one: <https://minecraftpocket-servers.com/server/113005/vote?username=${nickname}>
                > :two: <https://minecraft-mp.com/server/300411/vote?username=${nickname}>
                > :three: <https://craftlist.org/surocraft?nickname=${nickname}>
            `;
            return interaction.reply({ content: c, ephemeral: true });
        }

        if (interaction.customId.includes("ask")) {
            if (interaction.customId === "askAnother") {
                if (!isButtonAuthor(i)) return interaction.reply({ content: "> ❌ Tohle není tvá otázka!\nPoužij vlastní </ask:1130560523650482207> příkaz!", ephemeral: true });
                const modal = new ModalBuilder()
                    .setCustomId('askAnotherModal')
                    .setTitle('SuroCraft AI');

                const questionInput = new TextInputBuilder()
                    .setCustomId('question')
                    .setLabel("Jakou máš otázku?")
                    .setStyle(TextInputStyle.Paragraph);

                const firstActionRow = new ActionRowBuilder().addComponents(questionInput);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            } else if (interaction.customId === "askTryAgain") {
                if (!isButtonAuthor(i)) return interaction.reply({ content: "> ❌ Tohle není tvá otázka!\nPoužij vlastní </ask:1130560523650482207> příkaz!", ephemeral: true });
                await interaction.reply({ content: "> Probíhá pokus o aktualizaci... <a:x_DiscordLoading:792044840467693590>", ephemeral: true });

                const oldQuestion = interaction.message.embeds[0].fields[0].value.slice(3, -3);
                const answerNumber = interaction.message.embeds[0].fields[1].name.match(/\((.*?)\)/) ? parseInt(interaction.message.embeds[0].fields[1].name.match(/\((.*?)\)/)[1]) : -1;

                util.post(`https://api.gitbook.com/v1/spaces/fzLlukSVmfRk5ZZiGXZl/search/ask`, {
                    "query": oldQuestion
                }).then(async (response) => {
                    data = await response.data;
                    if (data.answer) {
                        const answer = data.answer.text;

                        const answerEmbed = new Discord.EmbedBuilder()
                            .setAuthor(interaction.message.embeds[0].author)
                            .addFields([
                                interaction.message.embeds[0].fields[0],
                                { name: `Odpověď (${answerNumber + 1}):`, value: "```\n" + answer + "```", inline: false }
                            ])
                            .setFooter(interaction.message.embeds[0].footer)
                            .setColor(interaction.message.embeds[0].color);

                        await interaction.message.edit({ embeds: [answerEmbed], components: [interaction.message.components[0]] });
                        await interaction.editReply({ content: "> Odpověď byla aktualizována úspěšně!", ephemeral: true });
                    } else {
                        const answerEmbed = new Discord.EmbedBuilder()
                            .setAuthor(interaction.message.embeds[0].author)
                            .addFields([
                                interaction.message.embeds[0].fields[0],
                                { name: `Odpověď:`, value: "Odpověď bohužel nebylo možné znovu vygenerovat.", inline: false }
                            ])
                            .setFooter(interaction.message.embeds[0].footer)
                            .setColor(interaction.message.embeds[0].color);

                        await interaction.message.edit({ embeds: [answerEmbed], components: [interaction.message.components[0]] });
                        await interaction.editReply({ content: "> Odpověď byla aktualizována neúspěšně.", ephemeral: true });
                    }
                }).catch(async (error) => {
                    console.log(error);

                    await interaction.editReply({ content: "> Odpověď byla aktualizována neúspěšně.", ephemeral: true });
                });
            } else if (interaction.customId === "askFollowup") {
                if (!isButtonAuthor(i)) return interaction.reply({ content: "> ❌ Tohle není tvá otázka!\nPoužij vlastní </ask:1130560523650482207> příkaz!", ephemeral: true });
                await interaction.reply({ content: "> Získávají se navazující otázky... <a:x_DiscordLoading:792044840467693590>", ephemeral: true });

                const oldQuestion = interaction.message.embeds[0].fields[0].value.slice(3, -3);
                const questionNumber = parseInt(interaction.message.embeds[0].fields[0].name.match(/\((.*?)\)/)[1]);

                util.post(`https://api.gitbook.com/v1/spaces/fzLlukSVmfRk5ZZiGXZl/search/ask`, {
                    "query": oldQuestion
                }).then(async (response) => {
                    data = await response.data;
                    let fls,
                        flc,
                        flt = [],
                        flb = new ActionRowBuilder();
                    if (!!data.answer.followupQuestions) {
                        fls = data.answer.followupQuestions;
                        if (fls.length > 5) flc = 5;
                        else flc = fls.length;

                        fls.forEach((fl, i) => {
                            console.log(i);

                            let numEmoji;
                            if (i === 0) numEmoji = "1️⃣";
                            else if (i === 1) numEmoji = "2️⃣";
                            else if (i === 2) numEmoji = "3️⃣";
                            else if (i === 3) numEmoji = "4️⃣";
                            else if (i === 4) numEmoji = "5️⃣";
                            else numEmoji = "❌";

                            flt.push(numEmoji + " `" + fl + "`");

                            flb.addComponents(
                                new ButtonBuilder()
                                    .setCustomId('askFlb' + i)
                                    .setStyle(ButtonStyle.Secondary)
                                    .setEmoji(numEmoji.toString()),
                            );
                        });

                        const flEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
                            .addFields([
                                { name: `Navazující otázky (${questionNumber}):`, value: flt.join("\n"), inline: false }
                            ])
                            .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                            .setColor(config.embeds.color);
                        await interaction.editReply({ content: null, embeds: [flEmbed], components: [flb], ephemeral: true });
                    } else {
                        fls = false,
                            flc = 0,
                            flt = false;

                        await interaction.editReply({ content: "> Žádné navazující otázky nebyly nalezeny.", ephemeral: true });
                    }
                }).catch(async (error) => {
                    console.log(error);

                    await interaction.editReply({ content: "> Vyskytla se vážná chyba SuroCraft AI.", ephemeral: true });
                });
            }
        }

        if (interaction.customId.includes("askFlb")) {
            if (!isButtonAuthor(i)) return interaction.reply({ content: "> ❌ Tohle není tvá otázka!\nPoužij vlastní </ask:1130560523650482207> příkaz!", ephemeral: true });
            await interaction.deferReply();

            const questionLine = interaction.message.embeds[0].fields[0].value.split("\n")[interaction.customId.slice(-1)];
            const question = questionLine.match(/\`(.*?)\`/)[1];
            const questionNumber = interaction.message.embeds[0].fields[0].name.match(/\((.*?)\)/) ? parseInt(interaction.message.embeds[0].fields[0].name.match(/\((.*?)\)/)[1]) : -1;

            util.post(`https://api.gitbook.com/v1/spaces/fzLlukSVmfRk5ZZiGXZl/search/ask`, {
                "query": question
            }).then(async (response) => {
                data = await response.data;
                if (data.answer) {
                    const answer = data.answer.text;

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askAnother')
                                .setLabel('Další')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("❓"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askTryAgain')
                                .setLabel('Znovu')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔄"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askFollowup')
                                .setLabel('Navazující')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔎"),
                        );

                    const answerEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
                        .addFields([
                            { name: `Otázka (${questionNumber + 1}):`, value: "```\n" + question + "```", inline: false },
                            { name: "Odpověď (1):", value: "```\n" + answer + "```", inline: false }
                        ])
                        .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                        .setColor(config.embeds.color);

                    await interaction.editReply({ embeds: [answerEmbed], components: [row] });
                } else {
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askAnother')
                                .setLabel('Další')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("❓"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askTryAgain')
                                .setLabel('Znovu')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔄"),
                        );

                    const answerEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.member.nickname, iconURL: interaction.member.displayAvatarURL() })
                        .addFields([
                            { name: `Otázka (${questionNumber + 1}):`, value: "```\n" + question + "```", inline: false },
                            { name: "Odpověď:", value: "Odpověď nebyla nalezena.\nZkus jinak formulovat otázku.", inline: false }
                        ])
                        .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                        .setColor(config.embeds.color);

                    await interaction.editReply({ embeds: [answerEmbed], components: [row] });
                }
            }).catch(async (error) => {
                console.log(error);
                const answerEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.member.nickname, iconURL: interaction.member.displayAvatarURL() })
                    .addFields([
                        { name: `Otázka (${questionNumber + 1}):`, value: "```\n" + question + "```", inline: false },
                        { name: "Odpověď:", value: "Vyskytla se vážná chyba, AI neodpověděla.\nZkus jinak formulovat otázku.", inline: false }
                    ])
                    .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                    .setColor(config.embeds.color);

                await interaction.editReply({ embeds: [answerEmbed] });
            });
        }
    }

    if (interaction.type === InteractionType.ModalSubmit) {
        if (!isButtonAuthor(i)) return interaction.reply({ content: "> ❌ Tohle není tvá otázka!\nPoužij vlastní </ask:1130560523650482207> příkaz!", ephemeral: true });
        if (interaction.customId === "askAnotherModal") {
            await interaction.deferReply();

            const question = interaction.fields.getTextInputValue('question');
            const oldQuestion = interaction.message.embeds[0].fields[0].value.slice(3, -3);
            const questionNumber = parseInt(interaction.message.embeds[0].fields[0].name.match(/\((.*?)\)/)[1]);

            util.post(`https://api.gitbook.com/v1/spaces/fzLlukSVmfRk5ZZiGXZl/search/ask`, {
                "query": question,
                "previousQueries": [oldQuestion]
            }).then(async (response) => {
                data = await response.data;
                if (data.answer) {
                    const answer = data.answer.text;

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askAnother')
                                .setLabel('Další')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("❓"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askTryAgain')
                                .setLabel('Znovu')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔄"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askFollowup')
                                .setLabel('Navazující')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔎"),
                        );

                    const answerEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
                        .addFields([
                            { name: `Otázka (${questionNumber + 1}):`, value: "```\n" + question + "```", inline: false },
                            { name: `Odpověď (1):`, value: "```\n" + answer + "```", inline: false }
                        ])
                        .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                        .setColor(config.embeds.color);

                    await interaction.editReply({ embeds: [answerEmbed], components: [row] });
                } else {
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askAnother')
                                .setLabel('Další')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("❓"),
                        )
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('askTryAgain')
                                .setLabel('Znovu')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔄"),
                        );

                    const answerEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.member.nickname, iconURL: interaction.member.displayAvatarURL() })
                        .addFields([
                            { name: `Otázka: (${questionNumber + 1})`, value: "```\n" + question + "```", inline: false },
                            { name: `Odpověď:`, value: "Odpověď nebyla nalezena.\nZkus jinak formulovat otázku.", inline: false }
                        ])
                        .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                        .setColor(config.embeds.color);

                    await interaction.editReply({ embeds: [answerEmbed], components: [row] });
                }
            }).catch(async (error) => {
                console.log(error);
                const answerEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.member.nickname, iconURL: interaction.member.displayAvatarURL() })
                    .addFields([
                        { name: `Otázka (${questionNumber + 1}):`, value: "```\n" + question + "```", inline: false },
                        { name: `Odpověď:`, value: "Vyskytla se vážná chyba, AI neodpověděla.\nZkus jinak formulovat otázku.", inline: false }
                    ])
                    .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                    .setColor(config.embeds.color);

                await interaction.editReply({ embeds: [answerEmbed] });
            });
        }
    }
};