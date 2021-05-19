const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "chora",
    alias: [],
    description: "Chora mais",
    usage: "chora <mencion>",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/chora.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** ${user ? `hace chorar a ${user.username}` : "Chora"}`)
            .setImage(res)
        message.channel.send(embed);
    }
};