const Discord = require("discord.js")

module.exports = {
    name: "8ball",
    alias: [],
    perms: [],
    description: "Akane te respondera a tu pregunta...",
    usage: "8ball <pregunta>",
    category: "Diversion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/8ball.json");

        if (!args[0]) {
            return message.channel.send("Dime una pregunta!");
        }
        if (args.join(" ").length >= 256) {
            return message.channel.send("Esa pregunta es demasiado larga, quieres que explote?")
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(args.join(" "), message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(res)
            .setFooter(`Preguntado por ${message.author.username}`);
        message.channel.send(embed);
    }
};