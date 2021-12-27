const { commands } = require("../config");
const Discord = require('discord.js');
const { fetchJson } = require('fetch-json');
const votesKey = process.env['votesKey']

module.exports.config = {
    name: "votes", //Name of command - RENAME THE FILE TOO!!!
    description: "Votes command", //Description of command - you can change it :)
    aliases: [ 'hlasy' ], //Command's aliases - set them in config.js
    enable: false //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot
    let icon = message.author.avatarURL
    let url = `https://minecraftpocket-servers.com/api/?object=servers&element=votes&key=${votesKey}&format=json`

    fetchJson.get(url).then(data => {
      let votesArray = data.votes
      const votesObject = Object.assign({}, votesArray);
      let votes = Object.keys(votesObject).length;

      const votesEmbed = new Discord.MessageEmbed()
        .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
        .setTitle('Počet hlasů pro SuroCraft')
        .setDescription(votes.toString())
        .setColor(config.embeds.color);
      message.channel.send({ embeds: [votesEmbed] });
    });
};