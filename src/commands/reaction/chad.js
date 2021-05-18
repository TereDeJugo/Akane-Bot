const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "chad",
    alias: [],
    description: "Conviertete en un chad",
    usage: "chad <mencion>",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/chad.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** es un chad ${user ? `con ${user.username}` : ""}`)
            .setImage(res)
        message.channel.send(embed);
    }
};