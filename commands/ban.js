const Discord = require('discord.js'),
  Timestamp = require('discord-timestamp'),
  ms = require('ms'),
  fs = require('fs'),
  { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
  name: "ban", //Name of command - RENAME THE FILE TOO!!!
  description: "Oznámí Minecraft ban na Discordu", //Description of command - you can change it :)
  aliases: ['banish'], //Command's aliases - set them in config.js
  enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
  const { server, config } = bot;
  let icon = message.author.avatarURL;

  let kanál = bot.channels.cache.get('890958568935788575');

  if (!message.member.roles.cache.find(r => r.id === "819306403041640459")) {
    return message.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
  }

  let player;
  if (!args[0]) {
    message.reply({ content: `**Napiš jméno hráče!**\nPoužij: \`${bot.prefix}ban <hráč> <doba> <důvod>\`` });
    return;
  } else {
    player = args[0];
  }

  let time,
    dateNowMs = Date.now();
  if (args[1] === "n" || args[1] === "0") {
    time = undefined;
  } else {
    timeMs = ms(args[1]);
    time = dateNowMs + timeMs;
  }

  let reason;
  if (!args.slice(2).join(" ")) {
    message.reply({ content: `**Napiš důvod banu!**\nPoužij: \`${bot.prefix}ban <hráč> <doba> <důvod>\`` });
    return;
  } else {
    reason = args.slice(2).join(" ");
  }

  const banEmbed = new Discord.EmbedBuilder()
    .setTitle(player + " byl zabanován")
    .setDescription(`**Hráč:**⠀⠀**__\`${player}\`__**\n**Datum:**⠀<t:${Timestamp(Date.now())}:f>\n**Staff:**⠀⠀<@${message.author.id}>\n**Vyprší:**⠀${time ? `<t:${Timestamp(time)}:R>` : "`Nikdy`"}\n**Důvod:**⠀\`${reason}\``)
    .setColor(config.embeds.color);
  kanál.send({ content: "<@&921813279431614465> 🔔", embeds: [banEmbed] });

  message.reply({ content: `Ban zpráva byla odeslána do <#890958568935788575>!` });
};