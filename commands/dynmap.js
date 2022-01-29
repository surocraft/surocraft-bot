const Discord = require('discord.js');

module.exports.config = {
    name: "dynmap", //Name of command - RENAME THE FILE TOO!!!
    description: "Pošle odkaz na dymapu", //Description of command - you can change it :)
    aliases: ["map", "mapa", "dyn"], //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot
    let icon = server.icon ? server.icon : message.guild.icon
    let serverName = config.server.name ? config.server.name : message.guild.name

        const dynmapEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Mapa světa")
            .setDescription("SuroCraft DynMap světa najdeš na **__[map.surocraft.eu](https://map.surocraft.eu/)__**")
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [dynmapEmbed] })
};