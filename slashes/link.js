const { SlashCommandBuilder } = require('@discordjs/builders'),
    Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Užitečné odkazy') //Description of command - you can change it :)
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Vyber místo na odkázání')
                .setRequired(true)
                .addChoices(
                    { name: 'Obchod', value: "3" },
                    { name: 'Dynmapa', value: "1" },
                    { name: 'Wiki', value: "2" },
                    { name: 'Všechny odkazy', value: "0" }
                ))
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();
    let serverName = config.server.name ? config.server.name : interaction.guild.name;

    const link = interaction.options.getString('link');
    const links = [
        { name: "DynMapa", link: "https://map.surocraft.eu", text: "DynMapu" },
        { name: "Wiki", link: "https://wiki.surocraft.eu", text: "Dokumentaci, tutoriály, návody serveru" },
        { name: "Obchod", link: "https://surocraft.craftingstore.net", text: "SuroCraft Obchod" }
    ];

    if (link === "0") {
        const linksEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("Užitečné odkazy")
            .setDescription("Všechny užitečné odkazy najdeš na **__[surocraft.eu](http://surocraft.eu/)__**")
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [linksEmbed] });;
    } else {
        const type = links[parseInt(link) - 1];
        const linksEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(type.name)
            .setDescription(`${type.text} najdeš na **__[${type.link.replace("https://", "")}](${type.link})__**`)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [linksEmbed] });
    }
};