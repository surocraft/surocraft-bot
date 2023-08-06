require("./src/functions/checks").nodeVersion();

const Discord = require('discord.js'),
    fs = require('fs'),
    c = require('chalk'),
    processInfo = c.cyan.bgBlack;
require('dotenv').config();

console.log(processInfo('>> minecraft-bot started <<'));

//Defining config and more
let dev;
try { if (fs.existsSync('./config/dev-main.js')) { dev = true; } }
catch (err) { console.log(err); }
require("./src/functions/base").createDataJson(dev);
const config = require(dev ? './config/dev-main' : './config/main'),
    token = require(dev ? './config/dev-token' : './config/token')["token"],
    dataJSON = require(dev ? './config/dev-data' : './config/data'),
    warns = config.settings.warns,
    intents = config.settings.commands.enableChat ? 34307 : 1539;

//Defining Discord bot
bot = new Discord.Client({ intents: intents }); //OLD: 34321
//https://discord-intents-calculator.vercel.app/

//Defining values
let info = config.statusCH;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.slashes = new Discord.Collection();
bot.dev = dev;
bot.token = token;
bot.prefix = config.bot.prefix;
bot.status = config.bot.status;
bot.pres = config.bot.presence;
bot.warns = warns;
bot.readyScan = config.settings.readyScan;
bot.server = Boolean;
bot.activity = config.bot.activity.toUpperCase();
bot.config = config;
bot.info = info;

server = Array;
server.type = config.server.type.toLowerCase();
server.ip = config.server.ip.toLowerCase();
server.port = parseInt(config.server.port);
server.work = true;
server.vote = config.server.vote;

//Config checks
require("./src/functions/checks").config(bot, server);

bot.settings = config.settings;
bot.settings.removeServerType = bot.settings.readyScan;
bot.server = server;
bot.config = config;
bot.dataJSON = dataJSON;

//Handlers (events and commands)
handlers = require("./src/functions/handlers");
handlers.events(bot);
handlers.commands(bot);

module.exports.bot = bot;

const schedule = require('node-schedule');

const votePingRule = new schedule.RecurrenceRule();
votePingRule.hour = 17;
votePingRule.minute = 0;
votePingRule.tz = 'Europe/Prague';

schedule.scheduleJob(votePingRule, function () {
    const votePingChannel = bot.channels.cache.get('921803832667832380');
    const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = Discord;
    row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('vote')
                .setLabel('Hlasovat')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🗳️'),
        );
    const votePingEmbed = new EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : bot.channels.cache.get('812280438490923048').name, iconURL: server.icon ? server.icon : bot.channels.cache.get('812280438490923048').icon })
        .setTitle("Je čas hlasovat! 🔔")
        .setDescription("*Právě je 17:00.*\n**Hlasovat můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://craftlist.org/surocraft#vote)__** (získáš 1K navíc)\n\nVíce o hlasování najdeš na __[wiki](https://wiki.surocraft.eu/#vote)__.\nNastav si připomínaček k hlasování __[zde](https://discord.com/channels/812280438490923048/870356969595228170/921812083916550214)__!")
        .setFooter({ text: 'Made by PetyXbron', iconURL: 'https://i.imgur.com/oq70O0t.png' })
        .setColor(config.embeds.color);
    votePingChannel.send({ content: `<@&932655587861364776>`, embeds: [votePingEmbed], components: [row] });
});

//Bot login
bot.login(bot.token);