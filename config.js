//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/config/config-info
//ENABLE BOT "SERVER MEMBERS INTENT" & "MESSAGE CONTENT INTENT" ON DISCORD DEVELOPER PORTAL
//YOU CAN DISABLE COMMANDS BY MESSAGE CONTENT ON LINE 97 (IF YOU WON'T USE "MESSAGE CONTENT INTENT")
module.exports = {
    //Your bot data
    bot: {
        //PASTE YOUR DISCORD BOT TOKEN IN DATA.JSON FILE (more secure) - https://tinyurl.com/discordbot-token
        prefix: "-", //Your custom prefix of the bot, like "!" or "."
        presence: "{onlinePlayers} hráčů online", //Custom activity/status text
        status: "ONLINE",  //You can choose: ONLINE, IDLE, DND (do not disturb), INVISIBLE
        activity: "WATCHING", //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
        guildID: "812280438490923048", //Your Discord server guild ID
    },

    //Your Minecraft server data
    server: {
        name: "SuroCraft", //Your server name
        type: "java", //"java" or "bedrock"
        ip: "mc.surocraft.eu", //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: "25565", //PORT of your server - empty => default port (JA 25565, BE 19132)
        icon: "https://i.imgur.com/Bp1BC8k.png", //Link to icon - like "https://website.com/icon.png"
        version: "1.7.x - 1.19.x", //Minecraft version of sever
        vote: "https://minecraftpocket-servers.com/server/113005/vote" //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    //All settings are boolean wanted - Use "true" for enabling, and "false" for disabling setting.
    settings: {
        warns: true, //Show warns?
        debug: false, //Log most of the changes and updates (pretty spam)?
        inviteLink: false, //Show bot invite link on bot start?
        readyScan: true, //On bot's start, send to console server's basic info?
        split: true, //Advanced - Extract only the version like "1.17" or "1.12" etc.
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: true, //Enable auto-changing status message?
        votingCH: false, //Enable voting channel?
        countingCH: false //Enable counting channel?
    },

    //Period of auto changing status if you are using {onlinePlayers} or {maxPlayers} in bot's presence
    autoStatus: {
        time: "10s", //Period of auto changing status - like "3min", "20s" or "1min" etc.
        offline: "Offline" //Changes bot's presence to this text if the server is offline / not found
    },

    //Auto changing status message
    statusCH: {
        channelID: "862039798267904030",
        time: "10s" //Period of updating status message - like "3min", "20s" or "1min" etc.
    },

    //Voting channel - https://mb.petyxbron.cz/config/config-info#voting-ch
    votingCH: {
        channelID: "",
        time: "30s", //Time for how long the cancel reaction should be deleted.
        threads: {
            enable: false, //Create discussion threads for each votingCH message
            nameSyntax: "Návrh {ID}", //Thread name ("{ID}" = ID of voting/suggestion)
            idSyntax: "001", //ID syntax - choose how many zeros should IDs show (DON'T REMOVE INTEGER "1")
            archiveTime: 1440 //Minutes after which the thread should archive in case of no recent activity
        },
        reactions: {
            first: "👍", //First added reaction (the positive one)
            second: "👎", //Second added reaction (the negative one)
            cancel: "❌" //Third added reaction (cancel/remove button)
        }
    },

    //Counting channel - auto updating channel name
    countingCH: {
        channelID: "",
        time: "1min", //Period of updating channel name - like "3min", "20s" or "1min" etc.
        name: "{onlinePlayers} players online!", //Name of the channel
        offline: "Server is offline!" //Name of the channel if the server is offline / not found
    },

    //Embeds settings
    embeds: {
        colors: {
            normal: "#87335a",  //Main/successful color of embeds - choose HEX color here: https://htmlcolorcodes.com
            error: "", //Error/unsuccessful color of embeds - choose HEX color here: https://htmlcolorcodes.com
        }
    },

    //Program process console logging
    console: {
        emojis: {
            success: "💚",
            info: "💙",
            warn: "💛",
            error: "🛑"
        }
    },

    //All commands settings
    commands: {
        enableNormals: true, //This requires having "message content" intent allowed on the Discord developer portal site
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
                description: "> **Java:** `1.7.x` - `1.19.x` (`1.17`+ doporučeno)\n> **Bedrock:** `1.19.x`"
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
                description: "**Hlasovat pro {serverName} můžeš na:**\n> :one: Hlavní stránce **__[zde](https://minecraftpocket-servers.com/server/113005/vote)__**\n> :two: Druhé stránce **__[zde](https://minecraft-mp.com/server/300411/vote)__** (získáš 1K navíc)\n> :three: Třetí stránce **__[zde](https://craftlist.org/surocraft#vote)__** (získáš 1K navíc)"
            }
        },
    }
};

//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/config/config-info