const { MessageEmbed } = require("discord.js");
const db = require("megadb");
const kissCount = new db.crearDB("kiss_counts");

module.exports = {
    name: "kiss",
    alias: [],
    perms: [],
    description: "Dale un beso a un usuario!",
    usage: "kiss [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/kiss.json");
        const user = message.mentions.users.first();
        let kisses;

        if(user) {
            if(kissCount.has(message.author.id + "&" + user.id)) {
                let kiss = await kissCount.get(message.author.id + "&" + user.id);
                kisses = kiss + 1;
                kissCount.set(message.author.id + "&" + user.id, kisses);
                kissCount.set(user.id + "&" + message.author.id, kisses);
            } else {
                kissCount.set(message.author.id + "&" + user.id, 1);
                kissCount.set(user.id + "&" + message.author.id, 1);
                kisses = 1;
            }
        }

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** le da un besote a ${user ? `**${user.username}**` : "el mismo"}`)
            .setImage(res)
            .setFooter(user ? `Se han dado ${kisses} besos!` : "El amor mas grande es el que tienes por ti mismo!")
        message.channel.send(embed);
    }
};
