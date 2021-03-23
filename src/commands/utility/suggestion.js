const Discord = require("discord.js");
const db = require("megadb");
const suggestions = new db.crearDB("suggestions");

module.exports = {
    name: "suggestion",
    alias: ["sg"],
    description: "Haz una sugerencia",
    usage: "suggestion <sugerencia>",
    category: "Utilidad",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Dime una sugerencia que quieras enviar!");
        }
        if (!suggestions.has(message.guild.id)) {
            return message.channel.send("El canal de sugerencias no esta definido");
        } else {
            message.delete();
            let channel_db = await suggestions.get(message.guild.id);
            let channel = message.guild.channels.cache.get(channel_db);

            let embed = new Discord.MessageEmbed()
                .setAuthor(
                    `Sugerencia de ${message.author.tag}`,
                    `${message.author.displayAvatarURL({ dynamic: true })}`
                )
                .setColor("RANDOM")
                .setDescription(args.join(" "))
                .setTimestamp();

            channel.send(embed);
        }
    }
};
