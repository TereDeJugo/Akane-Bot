const Discord = require("discord.js");
const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "suggestion",
    alias: ["sg"],
    perms: [],
    description: "Haz una sugerencia",
    usage: "suggestion <sugerencia>",
    category: "Utilidad",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Dime una sugerencia que quieras enviar!");
        }

        channel_db = await bot.get(`${message.guild.id}.suggestion`);
        channel = message.guild.channels.cache.get(channel_db);

        if (!channel) {
            return message.channel.send("El canal de sugerencias no fue encontrado, seleccionelo con `set-suggestion`");
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(`Sugerencia de ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setColor("RANDOM")
            .setDescription(args.join(" "))
            .setTimestamp();

        if (message.guild.me.hasPermission("MANAGE_MESSAGE")) {
            message.delete()
            channel.send(embed)
        } else {
            channel.send(embed)
        }
    }
};
