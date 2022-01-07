const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "links", //Name of command - RENAME THE FILE TOO!!!
    description: "Pošle užitečné odkazy", //Description of command - you can change it :)
    aliases: ["odkazy", "odkaz", "linktree", "link"], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot
    let icon = server.icon ? server.icon : message.guild.icon
    let serverName = config.server.name ? config.server.name : message.guild.name

        const linksEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Užitečné odkazy")
            .setDescription("Všechny užitečné odkazy najdeš na **__[surocraft.eu](http://surocraft.eu/)__**")
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [linksEmbed] })
};