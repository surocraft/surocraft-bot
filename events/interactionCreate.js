const Discord = require('discord.js'),
    { InteractionType } = Discord;

module.exports = async (bot, interaction) => {
    const i = interaction;
    const { server, config } = bot;
    icon = server.icon ? server.icon : i.guild.iconURL();

    if (interaction.type === InteractionType.MessageComponent) {
        nickname = i.member.displayName;
        if (i.customId === "vote") {
            c =
                `**Hlasování pro SuroCraft:**\nVygenerováno pro: **\`${nickname}\`**
                > :one: <https://minecraftpocket-servers.com/server/113005/vote?username=${nickname}>
                > :two: <https://minecraft-mp.com/server/300411/vote?username=${nickname}>
                > :three: <https://craftlist.org/surocraft?nickname=${nickname}>
            `;
            return i.reply({ content: c, ephemeral: true });
        }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = bot.slashes.get(interaction.commandName);
        if (command) {
            if (config.settings.randomColor) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                if (randomColor === config.embeds.color) {
                    config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
                } else {
                    config.embeds.color = randomColor;
                }
            }
            command.run(bot, interaction);
        }
    }
};