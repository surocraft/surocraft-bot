const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Sends the link for voting on Minecraft server list') //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();
    let serverName = config.server.name ? config.server.name : interaction.guild.name;

    if (text.vote.title === "" || text.vote.description === "") {
        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("Server list vote link:")
            .setDescription(server.vote ? `[Here](${server.vote}) you can vote for ${serverName}!` : "VOTE LINK IS NOT DEFINED IN CONFIG!")
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    } else {
        text.vote.title = text.vote.title.replace('{serverIp}', server.ip);
        text.vote.title = text.vote.title.replace('{serverPort}', server.port);
        text.vote.title = text.vote.title.replace('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.vote.title = text.vote.title.replace('{voteLink}', config.server.vote);
        text.vote.title = text.vote.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        nickname = message.member.displayName
        text.vote.description = `**Hlasovat pro {serverName} můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote?username=${nickname})__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote?username=${nickname})__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://www.wablio.com/server/33/vote?nickname=${nickname})__** (získáš 1K navíc)`
        text.vote.description = text.vote.description.replace('{serverIp}', server.ip);
        text.vote.description = text.vote.description.replace('{serverPort}', server.port);
        text.vote.description = text.vote.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
        text.vote.description = text.vote.description.replace('{voteLink}', config.server.vote);
        text.vote.description = text.vote.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(text.vote.title)
            .setDescription(text.vote.description)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    }
};