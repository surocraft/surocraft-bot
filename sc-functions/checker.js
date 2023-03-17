const Discord = require('discord.js'),
    ms = require('ms'),
    fs = require('fs');

module.exports = async (bot) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();
    let serverName = config.server.name ? config.server.name : interaction.guild.name;

    dataJSON = require(bot.dev ? '../dev-data' : '../data');
    const colors = [config.embeds.color, "#fcb503", "#36a832"];

    checkBannedPlayers();

    async function checkBannedPlayers() {
        dataJSON.bannedPlayers.forEach(async function (ban) {
            if (!!ban.expires && ban.expires < new Date()) {
                const banChannel = bot.channels.cache.get('890958568935788575');
                const banMsg = await banChannel.messages.fetch(ban.msg);

                dateT = Math.floor(ban.date.getTime() / 1000);
                expiresT = Math.floor(ban.expires.getTime() / 1000);

                const banEmbed = new Discord.EmbedBuilder()
                    .setTitle(ban.name + " - ban vypršel")
                    .setDescription(`
                    **Hráč:**⠀⠀⠀**__\`${ban.name}\`__**
                    **Datum:**⠀⠀<t:${dateT}:f> (<t:${dateT}:R>)
                    **Staff:**⠀⠀⠀<@${ban.staff}>
                    **Vypršel:**⠀<t:${expiresT}:R> (<t:${expiresT}:f>)
                    **Důvod:**⠀⠀\`${ban.reason}\`
                    `)
                    .setColor(colors[1])
                    .setFooter({ text: 'Aktualizováno' })
                    .setTimestamp();
                await banMsg.edit({ embeds: [banEmbed] });

                data = dataJSON;
                data.bannedPlayers.pop(ban);

                await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                    if (err) console.log("Could not edit the data.json content! Error:\n" + err);
                });
            }
        });

        setTimeout(checkBannedPlayers, ms("2s"));
    }
};