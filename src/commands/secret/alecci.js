const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "alecci",
    alias: [],
    description: "Que haces alecci",
    usage: "alecci",
    category: "Secreto",
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setImage("https://cdn.discordapp.com/attachments/763465906281381918/765406259729399828/alecci_cojiendo..PNG")
        .setDescription("Tipico de Alecci")
        .setColor("RANDOM");

        message.channel.send(embed)
    }
};