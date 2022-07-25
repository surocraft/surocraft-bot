const Discord = require('discord.js');
const ms = require('ms');
const { MessageActionRow, MessageButton, MessageEmbed } = Discord;
const fs = require('fs');
const { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
  name: "pushvote", //Name of command - RENAME THE FILE TOO!!!
  description: "Manuálně odešle vote notifikaci", //Description of command - you can change it :)
  aliases: ['pvote', 'tovote', 'votepush', 'nvote'], //Command's aliases - set them in config.js
  enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
  const { server, config } = bot;

  if (!message.member.roles.cache.find(r => r.id === "819306403041640459")) {
    return message.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
  }

  let row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('pushVote')
        .setLabel('Odeslat')
        .setStyle('DANGER')
        .setEmoji('✉️'),
    );


  const msg1 = await message.reply({ content: `> **Jsi si jistý, že chceš odeslat notifikaci k hlasování do <#921803832667832380> a zmínit roli?**\nMáš 30 vteřin na odpověď.`, components: [row] });

  const votePingEmbedNoMention = new MessageEmbed()
    .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
    .setTitle("Je čas hlasovat! 🔔")
    .setDescription("*Právě je 17:00.*\n**Hlasovat můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://www.wablio.com/server/33/vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!\n\nKlikni na tlačítka dole a vygeneruj si tak\nspeciální odkaz jen pro sebe, který ti automaticky\nvyplní herní přezdívku do pole.")
    .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
    .setColor(config.embeds.color);
  const msg2 = await message.channel.send({ content: "*Náhled notifikace:*" });
  const msg3 = await message.channel.send({ content: `@MENTION`, embeds: [votePingEmbedNoMention] });

  const filter = i => i.customId === 'pushVote' && i.user.id === message.author.id;

  const collector = message.channel.createMessageComponentCollector({
    filter, max: 1, time: ms('30s')
  });

  collector.on('collect', async i => {
    if (i.customId === 'pushVote') {
      msg2.delete();
      msg3.delete();

      row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('vote1')
            .setLabel('VOTE')
            .setStyle('SUCCESS')
            .setEmoji('1️⃣'),
        ).addComponents(
          new MessageButton()
            .setCustomId('vote2')
            .setLabel('VOTE')
            .setStyle('SUCCESS')
            .setEmoji('2️⃣'),
        ).addComponents(
          new MessageButton()
            .setCustomId('vote3')
            .setLabel('VOTE')
            .setStyle('SUCCESS')
            .setEmoji('3️⃣'),
        );

      const votePingChannel = bot.channels.cache.get('921803832667832380');
      const votePingEmbed = new MessageEmbed()
        .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
        .setTitle("Je čas hlasovat! 🔔")
        .setDescription("*Právě je 17:00.*\n**Hlasovat můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://www.wablio.com/server/33/vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!\n\nKlikni na tlačítka dole a vygeneruj si tak\nspeciální odkaz jen pro sebe, který ti automaticky\nvyplní herní přezdívku do pole.")
        .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
        .setColor(config.embeds.color);
      const notifikace = await votePingChannel.send({ content: `<@&932655587861364776>`, embeds: [votePingEmbed], components: [row] });

      await msg1.edit({ content: `> **Notifikace byla úspěšně odeslána!**\n**Kanál:** <#${notifikace.channelId}>\n**Zpráva:** ${notifikace.url}`, components: [] });
    }
  });

  collector.on('error', async () => {
    msg2.delete();
    msg3.delete();
    const newRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('pushVote')
          .setLabel('Odeslat')
          .setStyle('DANGER')
          .setEmoji('✉️')
          .setDisabled(true),
      );
    await msg1.edit({ content: `> **Čas vypršel.**\nNotifikace nebyla odeslána!`, components: [newRow] });
  });

  collector.on('end', async collected => {
    if (collected.size === 0) {
      msg2.delete();
      msg3.delete();
      const newRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('pushVote')
            .setLabel('Odeslat')
            .setStyle('DANGER')
            .setEmoji('✉️')
            .setDisabled(true),
        );
      await msg1.edit({ content: `> **Čas vypršel.**\nNotifikace nebyla odeslána!`, components: [newRow] });
    }
  });
};