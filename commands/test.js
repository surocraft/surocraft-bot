const { commands } = require("../config");

module.exports.config = {
    name: "test", //Name of command - RENAME THE FILE TOO!!!
    description: "Test command", //Description of command - you can change it :)
    aliases: commands.test, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (message) => {
    try { message.channel.send("Everything should work!"); } catch(e) { console.log(e); };
};