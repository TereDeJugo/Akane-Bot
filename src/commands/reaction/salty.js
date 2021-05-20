const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "salty",
    alias: [],
    description: "Ensala a alguien",
    usage: "salty [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/salty.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** ${user ? `salea a ${user.username}` : "esta salado"}`)
            .setImage(res)
        message.channel.send(embed);
    }
};