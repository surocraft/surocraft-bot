//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/installation/config
//ENABLE BOT "SERVER MEMBERS INTENT" & "MESSAGE CONTENT INTENT" ON DISCORD DEVELOPER PORTAL
//YOU CAN DISABLE COMMANDS USING MESSAGE CONTENT ON LINE 37 (IF YOU WON'T USE "MESSAGE CONTENT INTENT")

module.exports = {
    language: "surocraft", //Available: cs_CZ, en, es_ES, id_ID, pt_BR, pt_PT, ru_RU, vi_VN (path: /translations)

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
        port: "25565", //PORT of your server - if not entered, default port is selected (25565 / 19132)
        icon: "https://i.imgur.com/Bp1BC8k.png", //Link to icon - like "https://website.com/icon.png"
        version: "1.7.x - 1.19.x", //Minecraft version of sever
        vote: "https://minecraftpocket-servers.com/server/113005/vote" //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    //All settings are boolean wanted - Use "true" for enabling, and "false" for disabling setting.
    settings: {
        //General:
        warns: true, //Show warns?
        debug: false, //Log most of the changes and updates (pretty spam)?
        inviteLink: false, //Show bot invite link on bot start?
        readyScan: true, //On bot's start, send to console server's essential information?
        commands: {
            enableChat: true, //This requires having "message content" intent allowed on the Discord developer portal site.
            enableSlash: true //Enable Discord slash commands?
        },
        //Features:
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: true, //L59 - Enable auto-changing status message?
        votingCH: false, //L65 - Enable voting channel?
        imagesCH: true, //L84 - Enable images channel?
        countingCH: false, //L102 - Enable counting channel?
        //Advanced:
        removeServerType: true, //Remove "Spigot", "Purpur" etc. from version and leave only "1.18", "1.19" etc.?
        showDefaultPort: false //Show the server port behind IP if its default (25565, 19132) (primarily statusCH feature)?
    },

    //Period of auto changing status if you are using {onlinePlayers} or {maxPlayers} in bot's presence
    autoStatus: {
        time: "20s", //Period of auto changing status - like "3min", "20s" or "1min" etc.
        offline: "Offline" //Changes bot's presence to this text if the server is offline / not found
    },

    //Auto changing status message
    statusCH: {
        channelID: "862039798267904030",
        time: "20s" //Period of updating status message - like "3min", "20s" or "1min" etc.
    },

    //Voting channel
    votingCH: {
        channelID: "",
        time: "30s", //Time for how long the cancel reaction should be deleted.
        commands: false, //Enable commands (commands of this bot) usage?
        threads: {
            enable: false, //Create discussion threads for each votingCH message
            nameSyntax: "Návrh {ID}", //Thread name ("{ID}" = ID of voting/suggestion)
            idSyntax: "001", //ID syntax - choose how many zeros should IDs show (DON'T REMOVE INTEGER "1")
            archiveTime: 1440 //Minutes after which the thread should archive in case of no recent activity
        },
        reactions: {
            first: "👍", //First added reaction (the positive one)
            second: "👎", //Second added reaction (the negative one)
            cancel: "❌", //Third added reaction (cancel/remove button)
            deleteOther: true //Delete all other reactions than those mentioned above (admin's reactions are ignored)
        }
    },

    //Images channel
    imagesCH: {
        channelID: "1119655320856305726",
        commands: false, //Enable commands (commands of this bot) usage?
        allowWithTextOnly: false, //Should be text messages without any attachments allowed? These messages won't get threads
        allowWithTextAndImage: true, //Should be text messages allowed? If false, only messages with only attachments will be allowed
        threads: {
            enable: true, //Create discussion threads for each imagesCH message
            nameSyntax: "Img {ID}", //Thread name ("{ID}" = ID of post/image)
            idSyntax: "001", //ID syntax - choose how many zeros should IDs show (DON'T REMOVE INTEGER "1")
            archiveTime: 1440 //Minutes after which the thread should archive in case of no recent activity
        },
        reactions: {
            list: ["❤️", "😂", "😢"], //Which reactions should be added to the message?
            deleteOther: true //Delete all other reactions than those mentioned above (admin's reactions are ignored)
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
            debug: "💜",
            error: "🛑"
        }
    }
};

//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/installation/config