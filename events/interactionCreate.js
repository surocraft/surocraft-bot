const Discord = require('discord.js');

module.exports = async (bot, interaction) => {
    const i = interaction;
    const { prefix, server, config } = bot;
    icon = server.icon ? server.icon : i.guild.iconURL();

    if (config.settings.randomColor) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (randomColor === config.embeds.color) {
            config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
        } else {
            config.embeds.color = randomColor;
        }
    }

    if (i.isButton()) {
        nickname = i.member.displayName;
        if (i.customId === "vote") {
            c =
            `**Hlasování pro SuroCraft:**\nVygenerováno pro: **\`${nickname}\`**

            > :one: <https://minecraftpocket-servers.com/server/113005/vote?username=${nickname}>
            > :two: <https://minecraft-mp.com/server/300411/vote?username=${nickname}>
            > :three: <https://www.wablio.com/server/33/vote?nickname=${nickname}>
            `;
            return i.reply({ content: c, ephemeral: true });
        }

        if (i.customId === "vote1") {
            const voteEmbed = new Discord.MessageEmbed()
                .setTitle(`:one: Hlasovat`)
                .setColor(config.embeds.color)
                .setURL(`https://minecraftpocket-servers.com/server/113005/vote?username=${nickname}`);
            return i.reply({ embeds: [voteEmbed], ephemeral: true });
        }

        if (i.customId === "vote2") {
            const voteEmbed = new Discord.MessageEmbed()
                .setTitle(`:two: Hlasovat`)
                .setColor(config.embeds.color)
                .setURL(`https://minecraft-mp.com/server/300411/vote?username=${nickname}`);
            return i.reply({ embeds: [voteEmbed], ephemeral: true });
        }

        if (i.customId === "vote3") {
            const voteEmbed = new Discord.MessageEmbed()
                .setTitle(`:three: Hlasovat`)
                .setColor(config.embeds.color)
                .setURL(`https://www.wablio.com/server/33/vote?nickname=${nickname}`);
            return i.reply({ embeds: [voteEmbed], ephemeral: true });
        }
    }

    if (i.isCommand()) {
        const command = bot.slashes.get(i.commandName);
        if (command) command.run(bot, i);
    }
};