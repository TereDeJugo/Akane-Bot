const Discord = require("discord.js")

module.exports = {
    name: "8ball",
    alias: [],
    description: "Akane te respondera a tu pregunta...",
    usage: "8ball [pregunta]",
    category: "Diversion",
    run: (client, message, args) => {
        const answ = [
            "Si.",
            "No.",
            "No lo Se",
            "Pregunta en otro momento",
            "Tal vez si",
            "Tal vez no",
            "No respondere a eso",
            "Sin duda",
            "Creo que no deberias saber eso...",
            "No, no y no.",
            "La respuesta esta en ti",
            "No deberias estar haciendo algo...?",
            "Si, totalmente",
            "No estoy segura, pero creo que si..."
        ];
        const random = Math.floor(Math.random() * answ.length);

        if (!args[0]) {
            return message.channel.send("Dime una pregunta!");
        } else if (args.join(" ").length >= 256) {
            return message.channel.send("Esa pregunta es demasiado larga, quieres que explote?")
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(args.join(" "), message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(answ[random])
            .setFooter(`Preguntado por ${message.author.username}`);
        message.channel.send(embed);
    }
};
