const Discord = require("discord.js");

module.exports = {
    name: "emoteinfo",
    alias: ["emojiinfo", "emoji", "emote"],
    description: "Ve la informacion de un emote del servidor",
    usage: "emoteinfo <emote>",
    category: "Informacion",
    run: async (client, message, args) => {
        const emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1]);

        if (!emoji) return message.channel.send("Debes colocar un emoji del servidor que sea valido!");

        let type = {
            "true": "Animado",
            "false": "Estatico"
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(emoji.url)
            .setAuthor(`Informacion del emoji: "${emoji.name}"`)
            .addFields(
                { name: ":id: | ID", value: emoji.id },
                { name: ":bee: | Tipo", value: type[emoji.animated] },
                { name: ":calendar: | Creacion", value: emoji.createdAt.toLocaleDateString("es-pe") }
            )
        message.channel.send(embed)
    }
};