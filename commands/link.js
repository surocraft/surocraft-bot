const Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "links", //Name of command - RENAME THE FILE TOO!!!
    description: "Užitečné odkazy", //Description of command - you can change it :)
    aliases: ["odkazy", "odkaz", "linktree", "links"], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : message.guild.iconURL();
    let serverName = config.server.name ? config.server.name : message.guild.name;

    const linksEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
        .setTitle("Užitečné odkazy")
        .setDescription("Všechny užitečné odkazy najdeš na **__[surocraft.eu](http://surocraft.eu/)__**")
        .setColor(config.embeds.color);
    message.channel.send({ embeds: [linksEmbed] });
};