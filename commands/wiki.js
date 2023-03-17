const Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "wiki", //Name of command - RENAME THE FILE TOO!!!
    description: "Pošle odkaz na wiki", //Description of command - you can change it :)
    aliases: ["wikipedia", "docs", "documentation", "dokumentace", "podpora", "pomoc"], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : message.guild.iconURL();
    let serverName = config.server.name ? config.server.name : message.guild.name;

    const wikiEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
        .setTitle("SuroCraft WiKi")
        .setDescription("Dokumentaci, tutoriály, návody serveu najdeš na **__[wiki.surocraft.eu](https://wiki.surocraft.eu/)__**")
        .setColor(config.embeds.color);
    message.channel.send({ embeds: [wikiEmbed] });
};