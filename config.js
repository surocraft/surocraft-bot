const token = process.env['discordBotToken']

//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info
module.exports = {
    //Your bot data
    bot: {
        token: token, //Your bot token - https://tinyurl.com/discordbot-token
        prefix: '-', //Your custom prefix of the bot, like "!" or "."
        presence: '{onlinePlayers} hráčů online', //Custom activity/status text
        status: 'ONLINE',  //You can choose: ONLINE, IDLE, DND (do not disturb), INVISIBLE
        activity: 'WATCHING' //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
    },

    //Your Minecraft server data
    server: {
        name: 'SuroCraft', //Your server name
        type: 'java', //"java" or "bedrock"
        ip: 'mc.surocraft.eu', //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: '25565', //PORT of your server - empty => default port (BE 19132, JA 25565)
        icon: 'https://i.imgur.com/Bp1BC8k.png', //Link to icon - like "https://website.com/icon.png"
        version: '1.18.', //Minecraft version of sever
        vote: 'https://minecraftpocket-servers.com/server/113005/vote' //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    //All settings are boolean wanted - Use "true" for enabling, "false" for disablign setting.
    settings: {
        warns: true, //Show warns?
        debug: false, //Log most of changes and updates (pretty spam)?
        inviteLink: false, //Show bot invite link on bot start?
        readyScan: true, //On bot's start, send to console server's basic info?
        split: true, //Advanced - Extract only the version like "1.17" or "1.12" etc.
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: true, //Enable auto-changing status message
        votingCH: true //Enable voting channel
    },

    //Period of auto changing status if you are using {onlinePlayers} or {maxPlayers} in bot's status
    autoStatus: {
        time: '10s'
    },

    //Voting channel - https://docs.petyxbron.cz/config/config-info#voting-ch
    votingCH: {
        time: '30s', //Time for how long the cancel reaction should be deleted.
        reactions: {
            first: '👍', //First added reaction (the positive one)
            second: '👎', //Second added reacion (the negative one)
            cancel: '❌' //Third added reaction (cancel/remove button)
        },
        guild: {
            id: '812280438490923048'
        },
        channel: {
            id: '862805837465780225'
        }
    },

    //Auto changing status message
    statusCH: {
        time: '10s', //How long should the status always be updated? - like "3min", "20s" or "1min" etc.
        guild: {
            id: '812280438490923048',
        },
        channel: {
            id: '862039798267904030',
        }
    },

    //Embeds settings
    embeds: {
        colors: {
            normal: '#87335a',  //Main/succesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
            error: '', //Error/unsuccesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
        }
    },

    //Program process console logging
    console: {
        emojis: {
            success: "💚",
            info: "💙",
            warn: "💛",
            error: "❤️"
        }
    },

    //All commands settings
    commands: {
        enableSlashes: true, //If you want to disable only specific slashes, leave this true and go down
        //List of all commands:
        help: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                'help', 'commands', 'menu', 'pomoc', 'prikazy'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "SuroBot příkazy:",
                description: "> **Prefix:** \`{prefix}\`\n> **Příkazy:**\n{commands}",
                errorTitle: "Chyba! Příkaz \"{arg0}\" neexistuje.",
                errorDescription: "Příkaz `{arg0}` nebyl nalezen.\nZadaváš chybný alias nebo je příkaz vypnut."
            }
        },
        ip: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                'i', 'ip-address', 'address', 'connect', 'join'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "{serverName} IP:",
                description: "**JAVA** \`{serverIp}\`:\`{serverPort}\`\n**BEDROCK** \`mcbe.surocraft.eu\`:\`19132\`"
            }
        },
        list: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                'l', 'players', 'plist'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "{serverName} list:",
                description: "**{playersOnline}**/**{playersMax}**",
                listFormat: "```{playersList}```"
            }
        },
        status: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                's', 'info', 'server', 'overview', 'ov'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "Server status:",
                description:
                    `:white_check_mark: **ONLINE**
                    
                    **IP Adresa**
                    **JAVA** \`mc.surocraft.eu\`:\`25565\`
                    **BEDROCK** \`mcbe.surocraft.eu\`:\`19132\`
                    
                    **Verze**
                    {serverVersion}
                    
                    **Hráči**
                    **{playersOnline}**/**{playersMax}**`,
            }
        },
        test: {
            enableNormal: true, //Enables normal command
            //Test command doesn't have slash type. Is it really neccesary?
            aliases: [ //Only for normal commands
                't', 'try', 'testing'
            ],
            text: { //Custom text settings (for translating or customization)
                content: "Zdravím!"
            }
        },
        version: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                'v', 'ver'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "{serverName} verze:",
                description: "Java {serverVersion}\nBedrock 1.19.*"
            }
        },
        vote: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                'votelink'
            ],
            text: { //Custom text settings (for translating or customization)
                title: "{serverName} HLASOVÁNÍ:",
                description: "**Hlasovat pro {serverName} můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://www.wablio.com/server/33/vote)__** (získáš 1K navíc)"
            }
        },
    }
};

//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info