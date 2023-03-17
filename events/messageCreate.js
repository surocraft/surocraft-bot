const ms = require('ms'),
    package = require('../package.json'),
    fs = require('fs');

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const { prefix, server, config } = bot;
    const dataJSON = require(bot.dev ? '../dev-data' : '../data');

    if (message.content.includes("<@&965618194041679962>") && !message.member.roles.cache.find(r => r.id === "819306403041640459")) { //@🌍・hráči
        const timeout = ms('24h');
        const cooldown = dataJSON[`date-hraciRolePing_${message.author.id}`];
        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            //const remaining = ms(timeout - (Date.now() - cooldown));
            message.author.send("> Označil jsi roli **🌍・hráči** po druhé za den!\n__Nyní obdržíš mute na 24h.__\nV případě nedorozumění kontaktuj staff v <#862805973490991105>.");
            message.member.timeout(ms("24h"), "Druhé zmínění role \"🌍・hráči\" za den.").catch(console.error);
        } else if (!cooldown) {
            data = dataJSON;
            data[`date-hraciRolePing_${message.author.id}`] = Date.now();

            fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                if (err) console.log("Could not edit the data.json content! Error:\n" + err);
            });

            message.author.send("> Poprvé jsi pingnul roli **🌍・hráči**.\n__Prosím měj na paměti, že ji můžeš označit pouze jedenkrát denně.__\nPřekročení limitu může vést k ztlumení.");
        }
    }

    if (config.settings.votingCH && message.channel.id === config.votingCH.channelID) {
        if (message.content.startsWith(prefix)) return;

        message.react(config.votingCH.reactions.first);
        if (config.votingCH.reactions.second) message.react(config.votingCH.reactions.second);
        message.react(config.votingCH.reactions.cancel);

        const filter = (reaction, user) => reaction.emoji.name === config.votingCH.reactions.cancel && (user.id === message.author.id || message.guild.members.cache.get(user.id).permissions.has("MANAGE_MESSAGES") && user.id !== bot.user.id);
        const cancel = await message.createReactionCollector({ filter, time: ms(config.votingCH.time), max: 1 });

        cancel.on('collect', () => {
            if (message) message.reactions.removeAll();
        });

        cancel.on('end', async () => {
            if (message) {
                if (message.reactions.cache.get(config.votingCH.reactions.cancel)) {
                    message.reactions.cache.get(config.votingCH.reactions.cancel).remove();
                }

                if (config.votingCH.threads.enable) {
                    const dataJSON = bot.dataJSON;
                    lastID = dataJSON["VotingCHLastID"] ? dataJSON["VotingCHLastID"] : 0;
                    newID = parseInt(lastID) + 1;
                    ID = (config.votingCH.threads.idSyntax.replace("1", "") + newID).slice(-config.votingCH.threads.idSyntax.length);

                    const thread = await message.startThread({
                        name: config.votingCH.threads.nameSyntax.replaceAll("{ID}", ID),
                        autoArchiveDuration: config.votingCH.threads.archiveTime
                    });
                    await thread.leave();

                    data = dataJSON;
                    data["VotingCHLastID"] = newID;

                    fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                        if (err) console.log("Could not edit the data.json content! Error:\n" + err);
                    });
                }
            }
        });
    }

    if (!config.commands.enableNormals) return;

    if (message.content.includes(`minecraft-bot version`) || message.content.includes(`surocraft-bot version`)) {
        message.channel.sendTyping();
        setTimeout(function () {
            message.channel.send({ content: `> **surocraft-bot:** \`${package.version}\`\n> **minecraft-bot:** \`${package.forkedVersion}\`` });
        }, ms('1s'));
        return;
    }

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
        if (config.settings.randomColor) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if (randomColor === config.embeds.color) {
                config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
            } else {
                config.embeds.color = randomColor;
            }
        }

        commandfile.run(bot, message, args, server);
    }
};