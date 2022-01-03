const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "ip", //Name of command - RENAME THE FILE TOO!!!
    description: "Ip command", //Description of command - you can change it :)
    aliases: commands.ip, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot
    let icon = server.icon ? server.icon : message.guild.icon

        if(text.ip.title === "" || text.ip.description === "") {
            const ipEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle("IP address:")
                .setDescription(`\`${server.ip}\`:\`${server.port}\``)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [ipEmbed] });
        } else {
            text.ip.title = text.ip.title.replace('{serverIp}', server.ip)
            text.ip.title = text.ip.title.replace('{serverPort}', server.port)
            text.ip.title = text.ip.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.ip.title = text.ip.title.replace('{voteLink}', config.server.vote)
            text.ip.title = text.ip.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            text.ip.description = text.ip.description.replace('{serverIp}', server.ip)
            text.ip.description = text.ip.description.replace('{serverPort}', server.port)
            text.ip.description = text.ip.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.ip.description = text.ip.description.replace('{voteLink}', config.server.vote)
            text.ip.description = text.ip.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            const ipEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(text.ip.title)
                .setDescription(text.ip.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [ipEmbed] });
    }
};