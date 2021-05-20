const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "elegant",
    alias: ["fancy"],
    description: "Ponte elegante",
    usage: "elegant [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/elegant.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** ${user ? `se pone elegante por ${user.username}` : "se pone elegante"}`)
            .setImage(res)
        message.channel.send(embed);
    }
};