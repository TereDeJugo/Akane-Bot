const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "hug",
    alias: [],
    description: "Dale un abrazo a un usuario!",
    usage: "hug [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/hug.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** abraza fuerte a ${user ? `**${user.username}**` : "el mismo"}`)
            .setImage(res)
        message.channel.send(embed);
    }
};
