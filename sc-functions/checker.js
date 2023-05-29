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
        await dataJSON.bannedPlayers.forEach(async function (ban) {
            if (ban.expires !== 0 && ban.expires < new Date()) {
                const banChannel = bot.channels.cache.get('890958568935788575');
                const banMsg = await banChannel.messages.fetch(ban.msg);

                typ = ban.type;
                let typArr = new Array();
                if (typ === 0) {
                    typArr[0] = { name: "Minecraft Ban", iconURL: "https://i.imgur.com/e6Q03xu.png" };
                    typArr[1] = player + " - zabanován/a";
                    typArr[2] = player + " - ban odebrán";
                    typArr[3] = player + " - ban vypršel";
                    typArr[4] = "**Odebrán:**⠀";
                    typArr[5] = "**Původně:**⠀";
                } else if (typ === 1) {
                    typArr[0] = { name: "Minecraft Mute", iconURL: "https://i.imgur.com/e6Q03xu.png" };
                    typArr[1] = player + " - ztlumen/a";
                    typArr[2] = player + " - mute zrušen";
                    typArr[3] = player + " - mute vypršel";
                    typArr[4] = "**Zrušen:**⠀⠀";
                    typArr[5] = "**Původně:**⠀";
                } else if (typ === 2) {
                    typArr[0] = { name: "Discord Mute", iconURL: "https://i.imgur.com/vxLeVVm.png" };
                    typArr[1] = player + " - ztlumen/a";
                    typArr[2] = player + " - mute zrušen";
                    typArr[3] = player + " - mute vypršel";
                    typArr[4] = "**Zrušen:**⠀⠀";
                    typArr[5] = "**Původně:**⠀";
                } else if (typ === 3) {
                    typArr[0] = { name: "Discord Ban", iconURL: "https://i.imgur.com/vxLeVVm.png" };
                    typArr[1] = player + " - zabanován/a";
                    typArr[2] = player + " - ban odebrán";
                    typArr[3] = player + " - ban vypršel";
                    typArr[4] = "**Odebrán:**⠀";
                    typArr[5] = "**Původně:**⠀";
                }

                dateT = Math.floor(ban.date.getTime() / 1000);
                expiresT = Math.floor(ban.expires.getTime() / 1000);

                let staffMentions = new Array();
                ban.staff.forEach((e, i) => {
                    staffMentions[i] = `<@${e}>`;
                });

                const banEmbed = new Discord.EmbedBuilder()
                    .setAuthor(typArr[0])
                    .setTitle(typArr[3])
                    .setDescription(`
                    > **Hráč:**⠀⠀⠀**__\`${ban.name}\`__**
                    > **Datum:**⠀⠀<t:${dateT}:f>
                    > ⠀⠀⠀⠀⠀⠀⠀(<t:${dateT}:R>)
                    > **Staff:**⠀⠀⠀${staffMentions.join(", ")}
                    > **Vypršel:**⠀<t:${expiresT}:f>
                    > ⠀⠀⠀⠀⠀⠀⠀(<t:${expiresT}:R>)
                    > **Důvod:**⠀⠀\`${ban.reason}\`
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

                bot.channels.cache.get('862811186931433472').send({ content: `**Ban \`${ban.name}\` byl aktualizován!**\nOdkaz: <${banMsg.url}>` });
            }
        });

        setTimeout(checkBannedPlayers, ms("1min"));
    }
};