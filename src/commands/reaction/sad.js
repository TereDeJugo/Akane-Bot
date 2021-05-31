const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sad",
    alias: [],
    perms: [],
    description: "Ponte triste",
    usage: "sad [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/sad.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** esta triste ${user ? `por **${user.username}**` : ""}`)
            .setImage(res)
        message.channel.send(embed);
    }
};
