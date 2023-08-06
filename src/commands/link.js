const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "link", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Užitečné odkazy",
        aliases: ["odkazy", "odkaz", "linktree", "links"]
    },
    slash: new SlashCommandBuilder()
        .setName('link') //RENAME THE FILE TOO!!!
        .setDescription(`Užitečné odkazy`)
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

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL(),
        cmdArg = false;

    if (diType === "chat") {
        cmdArg = di.content.split(' ').slice(1)[0];
    }

    else if (diType === "slash") {
        cmdArg = di.options.getString('link');
        if (cmdArg === "0") cmdArg = false;
        else {
            const links = [
                { name: "DynMapa", link: "https://map.surocraft.eu", text: "DynMapu" },
                { name: "Wiki", link: "https://wiki.surocraft.eu", text: "Dokumentaci, tutoriály, návody serveru" },
                { name: "Obchod", link: "https://surocraft.craftingstore.net", text: "SuroCraft Obchod" }
            ];
            var link = links[parseInt(cmdArg) - 1];
        }
    }

    if (!cmdArg) {
        const linksEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle("Užitečné odkazy")
            .setDescription("Všechny užitečné odkazy najdeš na **__[surocraft.eu](http://surocraft.eu/)__**")
            .setColor(config.embeds.color);
        di.reply({ embeds: [linksEmbed], allowedMentions: { repliedUser: false } });;
    } else {
        const linksEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle(link.name)
            .setDescription(`${link.text} najdeš na **__[${link.link.replace("https://", "")}](${link.link})__**`)
            .setColor(config.embeds.color);
        di.reply({ embeds: [linksEmbed], allowedMentions: { repliedUser: false } });
    }
};