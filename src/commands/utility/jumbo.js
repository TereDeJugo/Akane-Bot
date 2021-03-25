const Discord = require("discord.js")

module.exports = {
    name: "jumbo",
    alias: ["e"],
    description: "Ve una imagen completa de un emote",
    usage: "jumbo <emote>",
    category: "Utilidad",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Especificame un emoji del servidor que quieras ver en grande")
        }
        
        let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])

        if (!emoji) {
            return message.channel.send("Debes colocar un emoji valido del servidor")
        }

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`[Imagen Completa](${emoji.url})`)
            .setImage(emoji.url)

        message.channel.send(embed)
    }
}