const { timeStamp } = require('console');

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
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(3)
                        .setMaxLength(16)
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
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(3)
                        .setMaxLength(16)
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Odebere data o banu ze systému')
                .addStringOption(option =>
                    option.setName('hráč')
                        .setDescription('Zadej herní jméno hráče')
                        .setRequired(true)
                        .setMinLength(3)
                        .setMaxLength(16)
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
    if (interaction.options._subcommand === "create") {
        player = interaction.options.getString('hráč');
        time = interaction.options.getString('doba');
        reason = interaction.options.getString('důvod');
        datum = interaction.options.getString('datum');

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
            .setTitle(player + " - zabanován/a")
            .setDescription(`
            **Hráč:**⠀⠀⠀**__\`${player}\`__**
            **Datum:**⠀⠀<t:${Timestamp(dateNow)}:f> (<t:${Timestamp(dateNow)}:R>)
            **Staff:**⠀⠀⠀<@${interaction.member.id}>
            **Vyprší:**⠀⠀${time ? `<t:${expireStamp}:R> (<t:${expireStamp}:f>)` : "`Neurčeno`"}
            **Důvod:**⠀⠀\`${reason}\`
            `)
            .setColor(colors[0])
            .setFooter({ text: 'Vytvořeno' })
            .setTimestamp();
        const banMsg = await banChannel.send({ content: "<@&921813279431614465> 🔔", embeds: [banEmbed] });

        data = dataJSON;
        data.bannedPlayers.push({
            name: player,
            msg: banMsg.id,
            date: dateNow,
            staff: interaction.member.id,
            expires: timeDate || 0,
            reason: reason
        });

        await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
            if (err) console.log("Could not edit the data.json content! Error:\n" + err);
        });

        if (interaction.channel === banChannel) return interaction.reply({ content: `**Ban zpráva byla odeslána!**`, ephemeral: true });
        return interaction.reply({ content: `**Ban zpráva byla odeslána do <#890958568935788575>!**` });
    }

    if (interaction.options._subcommand === "update") {
        player = interaction.options.getString('hráč');
        time = interaction.options.getString('doba');
        reason = interaction.options.getString('důvod');

        ban = dataJSON.bannedPlayers.find(({ name }) => name.toLowerCase() === player.toLowerCase());
        if (!ban || !time && !reason) {
            if (!time && !reason) return interaction.reply({ content: `*Neuvedl jsi žádné změny k aktualizaci banu!**` });
            return interaction.reply({ content: `**Hráč \`${player}\` není uložen v Discord ban systému!**` });
        } else {
            const banMsg = await banChannel.messages.fetch(ban.msg);

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

            let staffID, keepStaff;
            if (interaction.member.id === ban.staff) staffID = `<@${ban.staff}>`, keepStaff = true;
            else staffID = `<@${ban.staff}> <@${interaction.member.id}>`, keepStaff = false;

            const banEmbed = new Discord.EmbedBuilder()
                .setTitle(player + " - zabanován/a")
                .setDescription(`
                **Hráč:**⠀⠀⠀**__\`${player}\`__**
                **Datum:**⠀⠀<t:${Timestamp(ban.date)}:f> (<t:${Timestamp(ban.date)}:R>)
                **Staff:**⠀⠀⠀${staffID}
                **Vyprší:**⠀⠀${time ? `<t:${expireStamp}:R> (<t:${expireStamp}:f>)` : "`Neurčeno`"}
                **Důvod:**⠀⠀\`${reason ? reason : ban.reason}\`
                `)
                .setColor(colors[0])
                .setFooter({ text: 'Aktualizováno' })
                .setTimestamp();
            await banMsg.edit({ embeds: [banEmbed] }); //<@&921813279431614465>

            data = dataJSON;
            data.bannedPlayers.pop(ban);

            await fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                if (err) console.log("Could not edit the data.json content! Error:\n" + err);
            });

            data.bannedPlayers.push({
                name: player,
                msg: ban.msg,
                date: ban.date,
                staff: keepStaff ? ban.staff : interaction.member.id,
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
        player = interaction.options.getString('hráč');

        ban = dataJSON.bannedPlayers.find(({ name }) => name === player);
        if (!ban) {
            return interaction.reply({ content: `**Hráč \`${player}\` není uložen v Discord ban systému!**` });
        } else {
            data = dataJSON;
            data.bannedPlayers.pop(ban);

            const banMsg = await banChannel.messages.fetch(ban.msg);

            let staffID;
            if (interaction.member.id === ban.staff) staffID = `<@${ban.staff}>`;
            else staffID = `<@${ban.staff}> <@${interaction.member.id}>`;

            const banEmbed = new Discord.EmbedBuilder()
                .setTitle(player + " - ban odebrán")
                .setDescription(`
                **Hráč:**⠀⠀⠀**__\`${player}\`__**
                **Datum:**⠀⠀<t:${Timestamp(ban.date)}:f> (<t:${Timestamp(ban.date)}:R>)
                **Staff:**⠀⠀⠀${staffID}
                **Odebrán:**⠀<t:${Timestamp(Date.now())}:R> (<t:${Timestamp(Date.now())}:f>)
                **Důvod:**⠀⠀\`${ban.reason}\`
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