const Discord = require('discord.js');
const ms = require('ms');
const { MessageActionRow, MessageButton, MessageEmbed } = Discord;

module.exports.config = {
  name: "pushVote", //Name of command - RENAME THE FILE TOO!!!
  description: "Manually pushes vote notification alert", //Description of command - you can change it :)
  aliases: ['pvote', 'tovote', 'votepush', 'nvote'], //Command's aliases - set them in config.js
  enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
  const { server, config } = bot;

  if (!message.member.roles.cache.find(r => r.id === "819306403041640459")) {
    return message.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
  }

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('pushVote')
        .setLabel('Odeslat')
        .setStyle('DANGER')
        .setEmoji('✉️'),
    );


  const msg1 = await message.reply({ content: `Jsi si jistý, že chceš odeslat notifikaci k hlasování do <#921803832667832380> a zmínit roli?`, components: [row] });

  const votePingEmbedNoMention = new MessageEmbed()
        .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
        .setTitle("Je čas hlasovat! 🔔")
        .setDescription("*Právě je 17:00*\n**Hlasovat můžeš na:**\nHlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\nDruhé stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!")
        .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
        .setColor(config.embeds.color);
  const msg2 = await message.channel.send({ content: "*Náhled notifikace:*"})
  const msg3 = await message.channel.send({ content: `@MENTION\nhttps://bit.ly/surocraft-vote`, embeds: [votePingEmbedNoMention] });

  const filter = i => i.customId === 'pushVote' && i.user.id === message.author.id;

  const collector = message.channel.createMessageComponentCollector({
    filter, max: 1, time: ms('30s')
  });

  collector.on('collect', async i => {
    if (i.customId === 'pushVote') {
      msg2.delete()
      msg3.delete()
      const votePingChannel = bot.channels.cache.get('921803832667832380');
      const votePingEmbed = new MessageEmbed()
        .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
        .setTitle("Je čas hlasovat! 🔔")
        .setDescription("*Právě je 17:00*\n**Hlasovat můžeš na:**\nHlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\nDruhé stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!")
        .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
        .setColor(config.embeds.color);
      votePingChannel.send({ content: `<@&932655587861364776>\nhttps://bit.ly/surocraft-vote`, embeds: [votePingEmbed] });

      await msg1.edit({ content: `Notifikace odeslána!`, components: [] });
    }
  });

  collector.on('error', async () => {
    msg2.delete()
    msg3.delete()
    const newRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('pushVote')
          .setLabel('Odeslat')
          .setStyle('DANGER')
          .setEmoji('✉️')
          .setDisabled(true),
      );
    await msg1.edit({ content: `Čas vypršel.\nNotifikace nebyla odeslána!`, components: [newRow] });
  });

  collector.on('end', async () => {
    msg2.delete()
    msg3.delete()
    const newRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('pushVote')
          .setLabel('Odeslat')
          .setStyle('DANGER')
          .setEmoji('✉️')
          .setDisabled(true),
      );
    await msg1.edit({ content: `Čas vypršel.\nNotifikace nebyla odeslána!`, components: [newRow] });
  });
};