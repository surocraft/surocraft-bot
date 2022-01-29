const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	    .setName('links') //Name of command - RENAME THE FILE TOO!!!
	    .setDescription('Pošle užitečné odkazy') //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot
    let icon = server.icon ? server.icon : interaction.guild.icon
    let serverName = config.server.name ? config.server.name : interaction.guild.name

        const linksEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("Užitečné odkazy")
            .setDescription("Všechny užitečné odkazy najdeš na **__[surocraft.eu](http://surocraft.eu/)__**")
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [linksEmbed] })
};