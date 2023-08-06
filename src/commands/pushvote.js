const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "pushvote", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: false,
        description: "Manuálně odešle vote notifikaci",
        aliases: ['pvote', 'tovote', 'votepush', 'nvote']
    },
    slash: new SlashCommandBuilder()
        .setName('pushvote') //RENAME THE FILE TOO!!!
        .setDescription(`Manuálně odešle vote notifikaci`)
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        ms = require('ms'),
        { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = Discord;

    const { server, config } = bot;

    if (!di.member.roles.cache.find(r => r.id === "819306403041640459")) {
        return di.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
    }

    let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('pushVote')
                .setLabel('Odeslat')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('✉️'),
        );


    const msg1 = await di.reply({ content: `> **Jsi si jistý, že chceš odeslat notifikaci k hlasování do <#921803832667832380> a zmínit roli?**\nMáš 30 vteřin na odpověď.`, components: [row] });

    const testRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('vote')
                .setLabel('Hlasovat')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🗳️'),
        );
    const votePingEmbedNoMention = new EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
        .setTitle("Je čas hlasovat! 🔔")
        .setDescription("*Právě je 17:00.*\n**Hlasovat můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://craftlist.org/surocraft#vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!")
        .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
        .setColor(config.embeds.color);
    const msg2 = await di.channel.send({ content: "## *Náhled notifikace:*" });
    const msg3 = await di.channel.send({ content: `@MENTION`, embeds: [votePingEmbedNoMention], components: [testRow] });

    const filter = i => i.customId === 'pushVote' && i.user.id === di.author.id;

    const collector = di.channel.createMessageComponentCollector({
        filter, max: 1, time: ms('30s')
    });

    collector.on('collect', async i => {
        if (i.customId === 'pushVote') {
            msg2.delete();
            msg3.delete();

            row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('vote')
                        .setLabel('Hlasovat')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🗳️'),
                );

            const votePingChannel = bot.channels.cache.get('921803832667832380');
            const votePingEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
                .setTitle("Je čas hlasovat! 🔔")
                .setDescription("*Právě je 17:00.*\n**Hlasovat můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://craftlist.org/surocraft#vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!")
                .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
                .setColor(config.embeds.color);
            const notifikace = await votePingChannel.send({ content: `<@&932655587861364776>`, embeds: [votePingEmbed], components: [row] });

            await msg1.edit({ content: `> **Notifikace byla úspěšně odeslána!**\n**Kanál:** <#${notifikace.channelId}>\n**Zpráva:** ${notifikace.url}`, components: [] });
        }
    });

    collector.on('error', async () => {
        msg2.delete();
        msg3.delete();
        const newRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pushVote')
                    .setLabel('Odeslat')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('✉️')
                    .setDisabled(true),
            );
        await msg1.edit({ content: `> **Čas vypršel.**\nNotifikace nebyla odeslána!`, components: [newRow] });
    });

    collector.on('end', async collected => {
        if (collected.size === 0) {
            msg2.delete();
            msg3.delete();
            const newRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('pushVote')
                        .setLabel('Odeslat')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('✉️')
                        .setDisabled(true),
                );
            await msg1.edit({ content: `> **Čas vypršel.**\nNotifikace nebyla odeslána!`, components: [newRow] });
        }
    });
};