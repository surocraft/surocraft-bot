const { commands } = require("../config");;
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.config = {
    name: "help", //Name of command - RENAME THE FILE TOO!!!
    description: "Odešle pomocné menu se seznamem příkazů bota", //Description of command - you can change it :)
    aliases: commands.help, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : message.guild.iconURL();

    if (!args[0]) {
        let commands = [],
            lines = [];

        commands = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

        for (const commandFile of commands) {
            const command = bot.commands.get(commandFile.split(".js")[0]);
            command.config.description = command.config.description ? command.config.description : false;
            if (commands.length > 0) lines.push(`> \`${bot.prefix}${command.config.name ? command.config.name : commandFile.split(".js")[0]}\`` + (command.config.description ? ` - ${command.config.description}` : ""));
        }

        if (!text.help.title || !text.help.description) {
            const helpEmbed = new MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(config.server.name ? config.server.name : message.guild.name + " bot commands:")
                .setDescription(`> **Prefix:** \`${bot.prefix}\`\n\n> **Commands:**\n` + lines.join("\n"))
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [helpEmbed] });
        } else {
            text.help.title = text.help.title.replaceAll('{serverIp}', server.ip);
            text.help.title = text.help.title.replaceAll('{serverPort}', server.port);
            text.help.title = text.help.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.help.title = text.help.title.replaceAll('{voteLink}', config.server.vote);
            text.help.title = text.help.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.help.title = text.help.title.replaceAll('{prefix}', config.bot.prefix);
            text.help.title = text.help.title.replaceAll('{commands}', "\n" + lines.join("\n"));

            text.help.description = text.help.description.replaceAll('{serverIp}', server.ip);
            text.help.description = text.help.description.replaceAll('{serverPort}', server.port);
            text.help.description = text.help.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.help.description = text.help.description.replaceAll('{voteLink}', config.server.vote);
            text.help.description = text.help.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.help.description = text.help.description.replaceAll('{prefix}', config.bot.prefix);
            text.help.description = text.help.description.replaceAll('{commands}', "\n" + lines.join("\n"));

            const helpEmbed = new MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(text.help.title)
                .setDescription(text.help.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [helpEmbed] });
        }
        return;
    }

    if (bot.commands.has(args[0].toLocaleLowerCase()) || bot.aliases.has(args[0].toLocaleLowerCase())) {
        commandName = bot.commands.has(args[0].toLocaleLowerCase()) ? args[0].toLocaleLowerCase() : bot.aliases.get(args[0].toLocaleLowerCase());

        let command = bot.commands.get(commandName);

        const helpEmbed = new MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle(`${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Command:`)
            .setDescription(`
                > **Description:** ${!!command.config.description ? command.config.description : "Without description"}
                > **Aliases:** ${!!command.config.aliases ? "`" + bot.prefix + command.config.aliases.join(`\`, \`${bot.prefix}`) + "`" : "No aliases"}
            `)
            .setColor(config.embeds.color);
        return message.channel.send({ embeds: [helpEmbed] });
    }
};