const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "utc",
    alias: [],
    description: "Se lo ve fresco a mi pana UTC",
    usage: "utc",
    category: "Secreto",
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setImage("https://images-ext-2.discordapp.net/external/B3d1mP3IQwiaPPS4SO1uAy0oF8jweovWwBVPGVRvfiA/https/c.tenor.com/0kjL_IYLw5QAAAAM/bearded-bear-guy-slay.gif")
        .setDescription("UTC moment")
        .setColor("RANDOM");

        message.channel.send(embed)
    }
};