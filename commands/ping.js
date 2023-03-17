const Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "ping", //Name of command - RENAME THE FILE TOO!!!
    description: "Odebere nebo znovu přidá hráčskou roli pro oznámení", //Description of command - you can change it :)
    aliases: ['role', 'hrac', 'odebrat'], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot;
    let icon = server.icon ? server.icon : message.guild.iconURL();

    const pingRoleID = "965618194041679962";
    const guild = await message.guild;

    if (message.member.roles.cache.find(r => r.id === pingRoleID)) {
        message.member.roles.remove(pingRoleID);
        const pingRoleEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Ping role odebrána!")
            .setDescription(`**<@${message.author.id}>, byla ti odebrána role <@&${pingRoleID}>.**\nNyní má roli \`${guild.roles.cache.get(pingRoleID).members.size}\`/\`${guild.memberCount.toLocaleString() - 10}\` členů.`)
            .setColor(config.embeds.color);
        message.reply({ embeds: [pingRoleEmbed] });
    } else {
        message.member.roles.add(pingRoleID);
        const pingRoleEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Vítej zpět!")
            .setDescription(`**<@${message.author.id}>, byla ti zpět přidána role <@&${pingRoleID}>.**\nNyní má roli \`${guild.roles.cache.get(pingRoleID).members.size}\`/\`${guild.memberCount.toLocaleString() - 10}\` členů.`)
            .setColor(config.embeds.color);
        message.reply({ embeds: [pingRoleEmbed] });
    }
};