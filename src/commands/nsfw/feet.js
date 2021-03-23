const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos()
module.exports = {
    name: "feet",
    alias: ["foot, feets, foots"],
    description: "Prueba y sabras.",
    usage: "feet",
    category: "NSFW",
    run: (client, message, args) => {
        neko.nsfw.feet().then(neko => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(neko.url)
                .setFooter("Potenciado por nekos.life")
            message.channel.send(embed)
        })
    }
}