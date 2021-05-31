const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dance",
    alias: [],
    perms: [],
    description: "Danza!",
    usage: "dance [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/dance.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** esta bailando ${user ? `con ${user.username}` : ""}`)
            .setImage(res)
        message.channel.send(embed);
    }
};