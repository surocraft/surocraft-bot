const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    config: {
        name: "ask", //RENAME THE FILE TOO!!!
        enableChat: false,
        enableSlash: true,
        description: "Zeptá se SuroCraft AI na otázku",
        aliases: ["question"]
    },
    slash: new SlashCommandBuilder()
        .setName('ask') //RENAME THE FILE TOO!!!
        .setDescription(`Zeptá se SuroCraft AI na otázku`)
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Zadej svojí otázku')
                .setRequired(true))
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        util = require('axios');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    const question = di.options.getString('question');
    await di.deferReply();

    util.post(`https://api.gitbook.com/v1/spaces/fzLlukSVmfRk5ZZiGXZl/search/ask`, {
        "query": question
    }).then(async (response) => {
        data = await response.data;
        if (data.answer) {
            const answer = data.answer.text;

            const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;
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
                .setAuthor({ name: di.member.displayName, iconURL: di.member.displayAvatarURL() })
                .addFields([
                    { name: "Otázka (1):", value: "```\n" + question + "```", inline: false },
                    { name: "Odpověď (1):", value: "```\n" + answer + "```", inline: false }
                ])
                .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                .setColor(config.embeds.color);

            await di.editReply({ embeds: [answerEmbed], components: [row] });
        } else {
            const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;
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
                .setAuthor({ name: di.member.nickname, iconURL: di.member.displayAvatarURL() })
                .addFields([
                    { name: "Otázka (1):", value: "```\n" + question + "```", inline: false },
                    { name: "Odpověď:", value: "Odpověď nebyla nalezena.\nZkus jinak formulovat otázku.", inline: false }
                ])
                .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
                .setColor(config.embeds.color);

            await di.editReply({ embeds: [answerEmbed], components: [row] });
        }
    }).catch(async (error) => {
        console.log(error);
        const answerEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: di.member.nickname, iconURL: di.member.displayAvatarURL() })
            .addFields([
                { name: "Otázka (1):", value: "```\n" + question + "```", inline: false },
                { name: "Odpověď:", value: "Vyskytla se vážná chyba, AI neodpověděla.\nZkus jinak formulovat otázku.", inline: false }
            ])
            .setFooter({ text: 'wiki.surocraft.eu', iconURL: icon })
            .setColor(config.embeds.color);

        await di.editReply({ embeds: [answerEmbed] });
    });
};