const Discord = require('discord.js');
const Timestamp = require('discord-timestamp')

module.exports.config = {
    name: "ban", //Name of command - RENAME THE FILE TOO!!!
    description: "Ban command", //Description of command - you can change it :)
    aliases: [ 'banish' ], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot
    let icon = message.author.avatarURL

    let kanál = bot.channels.cache.get('890958568935788575')

    if (!message.member.roles.cache.find(r => r.id === "819306403041640459")) {
      return message.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**`})
    }

    if (!args[0]) {
      message.reply({ content: `**Napiš jméno hráče!**\nPoužij: \`${bot.prefix}ban (hráč) (důvod)\`` })
      return
    }

    if (args[1] === "n") {
      var time = "neurčito"
    } else {
      var time = args[1]
    }

    if (!args.slice(2).join(" ")) {
      message.reply({ content: `**Napiš důvod banu!**\nPoužij: \`${bot.prefix}ban (hráč) (důvod)\``})
      return
    }

    const banEmbed = new Discord.MessageEmbed()
        .setTitle('BAN: ' + args[0])
        .setDescription(`
        **User:** **__${args[0]}__**
        **Banned:** <t:${Timestamp(Date.now())}:f>
        **From:**      <@${message.author.id}>
        **Expires:**  \`${time}\`
        **Reason:** ${args.slice(2).join(" ")}
        `)
        .setColor(config.embeds.color);
    kanál.send({ content: "<@&921813279431614465> 🔔", embeds: [ banEmbed ] });

    message.reply({ content: `Ban zpráva byla odeslána do <#890958568935788575>!` })
};