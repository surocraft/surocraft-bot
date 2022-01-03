const token = process.env['discordBotToken']

//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info
module.exports = {
    //Your bot data
    bot: {
        token: token, //Your bot token - https://tinyurl.com/discordbot-token
        prefix: '-', //Your custom prefix of the bot, like "!" or "."
        status: '{onlinePlayers} online', //Custom activity/status text
        activity: 'WATCHING' //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
    },

    //Your minecraft server data
    server: {
        name: 'SuroCraft', //Your server name
        type: 'java', //"java" or "bedrock"
        ip: 'mc.surocraft.eu', //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: '', //PORT of your server - empty => default port (BE 19132, JA 25565)
        icon: 'https://i.imgur.com/0T74i5U.png', //Link to icon - like "https://website.com/icon.png"
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
        time: '30s'
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
        time: '30s', //How long should the status always be updated? - like "3min", "20s" or "1min" etc.
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

    messages: {
        ip: {
            title: "{serverName} IP:",
            description: "**JAVA** \`{serverIp}\`:\`{serverPort}\`\n**BEDROCK** \`mcbe.surocraft.eu\`:\`19132\`"
        },
        list: {
            title: "{serverName} list:",
            description: "**{playersOnline}**/**{playersMax}**",
            listFormat: "```{playersList}```"
        },
        status: {
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
        },
        test: {
            content: "Zdravím!"
        },
        version: {
            title: "{serverName} verze:",
            description: "Java {serverVersion}\nBedrock 1.8.*"
        },
        vote: {
            title: "{serverName} HLASOVÁNÍ:",
            description: "[Zde]({voteLink}) můžeš hlasovat pro {serverName}."
        }
    },

    //Commands aliases
    commands: {
        status: [
            's',
            'info',
            'server',
            'overview',
            'ov'
        ],
        test: [
            't',
            'try',
            'testing'
        ],
        ip: [
            'i',
            'ip-address',
            'address',
            'connect',
            'join'
        ],
        list: [
            'l',
            'players',
            'plist'
        ],
        vote: [
            'votelink'
        ],
        version: [
            'v',
            'ver'
        ]
    }
};
//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info