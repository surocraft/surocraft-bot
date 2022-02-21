const Discord = require('discord.js');

module.exports.config = {
  name: "nickname", //Name of command - RENAME THE FILE TOO!!!
  description: "Nickname command", //Description of command - you can change it :)
  aliases: ['nick', 'name'], //Command's aliases - set them in config.js
  enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
  const { server, config } = bot;
  icon = server.icon ? server.icon : message.guild.iconURL();

  if (!message.member.roles.cache.find(r => r.id === "819306403041640459")) {
    return message.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
  }

  if (args[0]) var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
  if (!user || !args[0]) {
    return message.reply({ content: `**Neoznačil jsi člena, kterému chceš změnit nickname!**` });
  }

  const nickname = args.slice(1).join(" ");
  if (!nickname) {
    return message.reply({ content: `**Nezadal jsi novou přezdívku!**` });
  }

  const nickEmbed = new Discord.MessageEmbed()
    .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
    .setTitle('Změna přezdívky')
    .setDescription(`
        **Staff:** <@${message.author.id}>
        **Uživatel:**      <@${user.id}>
        **Stará přezdívka:** \`${user.displayName ? user.displayName : user.username}\`
        **Nová přezdívka:** \`${nickname}\`
        `)
    .setColor(config.embeds.color);
  message.channel.send({ embeds: [nickEmbed] });

  try {
    user.setNickname(nickname);
  } catch (err) {
    message.reply({ content: "Nemohl jsem tomuto uživateli změnit pžezdívku!" });
    console.log(err);
  }
};