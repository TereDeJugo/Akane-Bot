const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kiss",
    alias: [],
    description: "Dale un beso a un usuario!",
    usage: "kiss <mencion>",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/kiss.json");
        const user = message.mentions.users.first() || message.author;

        if(!user) {
            return message.channel.send("El usuario especificado no ha sido encontrado, recuerda mencionarlo!")
        }

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** le da un besote a **${user.username}**`)
            .setImage(res)
        message.channel.send(embed);
    }
};
