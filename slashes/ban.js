const { SlashCommandBuilder } = require('@discordjs/builders'),
    Discord = require('discord.js'),
    { PermissionFlagsBits } = Discord,
    Timestamp = require('discord-timestamp'),
    ms = require('ms'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Správa oznámení Minecraft banů na Discordu') //Description of command - you can change it :)
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Oznámí Minecraft ban na Discordu')
                .addStringOption(option =>
                    option.setName('typ')
                        .setDescription('Vyber typ trestu')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Discord Ban', value: "3" },
                            { name: 'Discord Mute', value: "2" },
                            { name: 'Minecraft Mute', value: "1" },
                            { name: 'Minecraft Ban', value: "0" }
                        ))
                .addStringOption(option =>
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(2)
                )
                .addStringOption(option =>
                    option.setName('doba')
                        .setDescription('Zadej dobu banu')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('důvod')
                        .setDescription('Zadej důvod banu')
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option.setName('staff')
                        .setDescription('Zadej staff')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option.setName('datum')
                        .setDescription('Zadej čas banu')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('update')
                .setDescription('Aktualizuje oznámení Minecraft banu')
                .addStringOption(option =>
                    option.setName('typ')
                        .setDescription('Vyber typ trestu')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Discord Ban', value: "3" },
                            { name: 'Discord Mute', value: "2" },
                            { name: 'Minecraft Mute', value: "1" },
                            { name: 'Minecraft Ban', value: "0" }
                        ))
                .addStringOption(option =>
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(2)
                )
                .addStringOption(option =>
                    option.setName('doba')
                        .setDescription('Zadej dobu banu')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option.setName('důvod')
                        .setDescription('Zadej důvod banu')
                        .setRequired(false)
                )
                .addUserOption(option =>
                    option.setName('staff')
                        .setDescription('Zadej staff')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option.setName('datum')
                        .setDescription('Zadej čas banu')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option.setName('novytyp')
                        .setDescription('Vyber nový typ trestu')
                        .setRequired(false)
                        .addChoices(
                            { name: 'Discord Ban', value: "3" },
                            { name: 'Discord Mute', value: "2" },
                            { name: 'Minecraft Mute', value: "1" },
                            { name: 'Minecraft Ban', value: "0" }
                        ))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Odebere data o banu ze systému')
                .addStringOption(option =>
                    option.setName('typ')
                        .setDescription('Vyber typ trestu')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Discord Ban', value: "3" },
                            { name: 'Discord Mute', value: "2" },
                            { name: 'Minecraft Mute', value: "1" },
                            { name: 'Minecraft Ban', value: "0" }
                        ))
                .addStringOption(option =>
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(2)
                )
                .addUserOption(option =>
                    option.setName('staff')
                        .setDescription('Zadej staff')
                        .setRequired(false)
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();
    let serverName = config.server.name ? config.server.name : interaction.guild.name;

    const { staff } = require('../sc-functions/general');
    const dataJSON = require(bot.dev ? '../dev-data' : '../data');
    const banChannel = bot.channels.cache.get('890958568935788575');
    const colors = [config.embeds.color, "#fcb503", "#36a832"];

    if (!staff(interaction)) return;
    //Ban Role <@&921813279431614465>

    player = interaction.options.getString('hráč');
    typ = parseInt(interaction.options.getString('typ'));
    let novyTyp = undefined;
    let novyTypArr = new Array();
    if (interaction.options._subcommand === "update") novyTyp = parseInt(interaction.options.getString('novytyp'));
    let typArr = new Array();
    if (typ === 0 || novyTyp === 0) {
        typArr[0] = { name: "Minecraft Ban", iconURL: "https://i.imgur.com/e6Q03xu.png" };
        typArr[1] = player + " - zabanován/a";
        typArr[2] = player + " - ban odebrán";
        typArr[3] = player + " - ban vypršel";
        typArr[4] = "**Odebrán:**⠀";
        typArr[5] = "**Původně:**⠀";
        if (novyTyp) novyTypArr = typArr;
    } else if (typ === 1 || novyTyp === 1) {
        typArr[0] = { name: "Minecraft Mute", iconURL: "https://i.imgur.com/e6Q03xu.png" };
        typArr[1] = player + " - ztlumen/a";
        typArr[2] = player + " - mute zrušen";
        typArr[3] = player + " - mute vypršel";
        typArr[4] = "**Zrušen:**⠀⠀";
        typArr[5] = "**Původně:**⠀";
        if (novyTyp) novyTypArr = typArr;
    } else if (typ === 2 || novyTyp === 2) {
        typArr[0] = { name: "Discord Mute", iconURL: "https://i.imgur.com/vxLeVVm.png" };
        typArr[1] = player + " - ztlumen/a";
        typArr[2] = player + " - mute zrušen";
        typArr[3] = player + " - mute vypršel";
        typArr[4] = "**Zrušen:**⠀⠀";
        typArr[5] = "**Původně:**⠀";
        if (novyTyp) novyTypArr = typArr;
    } else if (typ === 3 || novyTyp === 3) {
        typArr[0] = { name: "Discord Ban", iconURL: "https://i.imgur.com/vxLeVVm.png" };
        typArr[1] = player + " - zabanován/a";
        typArr[2] = player + " - ban odebrán";
        typArr[3] = player + " - ban vypršel";
        typArr[4] = "**Odebrán:**⠀";
        typArr[5] = "**Původně:**⠀";
        if (novyTyp) novyTypArr = typArr;
    }

    if (interaction.options._subcommand === "create") {
        time = interaction.options.getString('doba');
        reason = interaction.options.getString('důvod');
        datum = interaction.options.getString('datum');
        staffak = (interaction.options.getUser('staff') || interaction.member).id;

        ban = dataJSON.bannedPlayers.find(({ name, type }) => name.toLowerCase() === player.toLowerCase() && type === typ);
        if (ban) return interaction.reply({ content: `**Hráč \`${player}\` je již uložen v Discord ban systému!**\n> **Typ:** ${typArr[0].name}`, ephemeral: true });

        dateNow = datum ? new Date(datum) : new Date();
        if (time === "n" || time === "0") {
            time = undefined;
        } else {
            timeMs = ms(time);
            timeDateMs = dateNow.getTime() + timeMs;
            var timeDate = new Date(timeDateMs);
            var expireStamp = Math.floor(timeDateMs / 1000);
        }

        const banEmbed = new Discord.EmbedBuilder()
            .setAuthor(typArr[0])
            .setTitle(typArr[1])
            .setDescription(`
            > **Hráč:**⠀⠀⠀**__\`${player}\`__**
            > **Datum:**⠀⠀<t:${Timestamp(dateNow)}:f>
            > ⠀⠀⠀⠀⠀⠀⠀(<t:${Timestamp(dateNow)}:R>)
            > **Staff:**⠀⠀⠀<@${staffak}>
            > **Vyprší:**⠀⠀${time ? `<t:${expireStamp}:f>\n> ⠀⠀⠀⠀⠀⠀⠀(<t:${expireStamp}:R>)` : "`Neurčeno`"}
            > **Důvod:**⠀⠀\`${reason}\`
            `)
            .setColor(colors[0])
            .setFooter({ text: 'Vytvořeno' })
            .setTimestamp();
        const banMsg = await banChannel.send({ content: "<@&921813279431614465> 🔔", embeds: [banEmbed] });
        //Ban Role <@&921813279431614465>

        data = dataJSON;
        data.bannedPlayers.push({
            type: typ,
            name: player,
            msg: banMsg.id,
            date: dateNow,
            staff: [interaction.member.id],
            expires: timeDate || 0,
            reason: reason
        });

        await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
            if (err) console.log("Could not edit the data.json content! Error:\n" + err);
        });

        if (interaction.channel === banChannel) return interaction.reply({ content: `**Ban zpráva byla odeslána!**\n> **Typ:** ${typArr[0].name}`, ephemeral: true });
        return interaction.reply({ content: `**Ban zpráva byla odeslána do <#890958568935788575>!**\n> **Typ:** ${typArr[0].name}` });
    }

    if (interaction.options._subcommand === "update") {
        time = interaction.options.getString('doba');
        reason = interaction.options.getString('důvod');
        datum = interaction.options.getString('datum');
        staffak = (interaction.options.getUser('staff') || interaction.member).id;

        ban = dataJSON.bannedPlayers.find(({ name, type }) => name.toLowerCase() === player.toLowerCase() && type === typ);
        if (!ban || !novyTyp && !time && !reason && !datum && !interaction.options.getUser('staff')) {
            if (!time && !reason && !interaction.options.getUser('staff')) return interaction.reply({ content: `**Neuvedl jsi žádné změny k aktualizaci banu!**`, ephemeral: true });
            return interaction.reply({ content: `**Hráč \`${player}\` není uložen v Discord ban systému!**\n> **Hledaný typ:** ${typArr[0].name}`, ephemeral: true });
        } else {
            const banMsg = await banChannel.messages.fetch(ban.msg);

            date = datum ? new Date(datum) : ban.date;

            let expireStamp;
            if (!time) {
                if (ban.expires !== 0) {
                    time = ban.expires;
                    expireStamp = Math.floor(new Date(ban.expires).getTime() / 1000);
                } else time = undefined;
            } else if (time === "n" || time === "0") {
                time = undefined;
            } else {
                dateNow = new Date();
                timeMs = ms(time);
                timeDateMs = dateNow.getTime() + timeMs;
                time = new Date(timeDateMs);
                expireStamp = Math.floor(timeDateMs / 1000);
            }

            let staffMentions = new Array();
            if (ban.staff.includes(staffak)) {
                ban.staff.forEach((e, i) => {
                    staffMentions[i] = `<@${e}>`;
                });
            }
            else {
                ban.staff.push(staffak);
                ban.staff.forEach((e, i) => {
                    staffMentions[i] = `<@${e}>`;
                });
            }

            const banEmbed = new Discord.EmbedBuilder()
                .setAuthor(novyTypArr[0] || typArr[0])
                .setTitle(novyTypArr[1] || typArr[1])
                .setDescription(`
                > **Hráč:**⠀⠀⠀**__\`${player}\`__**
                > **Datum:**⠀⠀<t:${Timestamp(date)}:f>
                > ⠀⠀⠀⠀⠀⠀⠀(<t:${Timestamp(date)}:R>)
                > **Staff:**⠀⠀⠀${staffMentions.join(", ")}
                > **Vyprší:**⠀⠀${time ? `<t:${expireStamp}:f>\n> ⠀⠀⠀⠀⠀⠀⠀(<t:${expireStamp}:R>)` : "`Neurčeno`"}
                > **Důvod:**⠀⠀\`${reason ? reason : ban.reason}\`
                `)
                .setColor(colors[0])
                .setFooter({ text: 'Aktualizováno' })
                .setTimestamp();
            await banMsg.edit({ embeds: [banEmbed] });

            data = dataJSON;
            data.bannedPlayers.pop(ban);

            await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                if (err) console.log("Could not edit the data.json content! Error:\n" + err);
            });

            data.bannedPlayers.push({
                type: novyTyp || typ,
                name: player,
                msg: ban.msg,
                date: date,
                staff: ban.staff,
                expires: time || 0,
                reason: reason ? reason : ban.reason
            });

            await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                if (err) console.log("Could not edit the data.json content! Error:\n" + err);
            });

            if (interaction.channel === banChannel) return interaction.reply({ content: `**Ban zpráva byla aktualizována.**`, ephemeral: true });
            return interaction.reply({ content: `**Ban zpráva byla aktualizována. Odkaz: <${banMsg.url}>**` });
        }
    }

    if (interaction.options._subcommand === "remove") {
        staffak = (interaction.options.getUser('staff') || interaction.member).id;

        ban = dataJSON.bannedPlayers.find(({ name, type }) => name.toLowerCase() === player.toLowerCase() && type === typ);
        if (!ban) {
            return interaction.reply({ content: `**Hráč \`${player}\` není uložen v Discord ban systému!**\n> **Hledaný typ:** ${typArr[0].name}`, ephemeral: true });
        } else {
            data = dataJSON;
            data.bannedPlayers.pop(ban);

            const banMsg = await banChannel.messages.fetch(ban.msg);

            if (ban.expires !== 0) {
                time = ban.expires;
                expireStamp = Math.floor(new Date(ban.expires).getTime() / 1000);
            } else time = undefined;

            let staffMentions = new Array();
            if (ban.staff.includes(staffak)) {
                ban.staff.forEach((e, i) => {
                    staffMentions[i] = `<@${e}>`;
                });
            }
            else {
                ban.staff.push(staffak);
                ban.staff.forEach((e, i) => {
                    staffMentions[i] = `<@${e}>`;
                });
            }

            const banEmbed = new Discord.EmbedBuilder()
                .setAuthor(typArr[0])
                .setTitle(typArr[2])
                .setDescription(`
                > **Hráč:**⠀⠀⠀**__\`${player}\`__**
                > **Datum:**⠀⠀<t:${Timestamp(ban.date)}:f>
                > ⠀⠀⠀⠀⠀⠀⠀(<t:${Timestamp(ban.date)}:R>)
                > **Staff:**⠀⠀⠀${staffMentions.join(", ")}
                > ${typArr[5]}${time ? `<t:${expireStamp}:f>\n> ⠀⠀⠀⠀⠀⠀⠀(<t:${expireStamp}:R>)` : "`Neurčeno`"}
                > ${typArr[4]}<t:${Timestamp(Date.now())}:f>
                > ⠀⠀⠀⠀⠀⠀⠀(<t:${Timestamp(Date.now())}:R>)
                > **Důvod:**⠀⠀\`${ban.reason}\`
                `)
                .setColor(colors[2])
                .setFooter({ text: 'Aktualizováno' })
                .setTimestamp();
            await banMsg.edit({ embeds: [banEmbed] });

            await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                if (err) console.log("Could not edit the data.json content! Error:\n" + err);
            });

            if (interaction.channel === banChannel) return interaction.reply({ content: `**Ban zpráva byla aktualizována.**`, ephemeral: true });
            return interaction.reply({ content: `**Ban zpráva byla aktualizována. Odkaz: <${banMsg.url}>**` });
        }
    }

};