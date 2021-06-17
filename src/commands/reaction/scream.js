const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "scream",
    alias: [],
    perms: [],
    description: "Scream",
    usage: "scream [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/scream.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** ${user ? `esta scream por ${user.username}` : "esta scream"}`)
            .setImage(res)
        message.channel.send(embed);
    }
};