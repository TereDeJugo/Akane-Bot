const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos()

module.exports = {
    name: "femdom",
    alias: ["fd, femd"],
    description: "Prueba y sabras.",
    usage: "femdom",
    category: "NSFW",
    run: (client, message, args) => {
        neko.nsfw.femdom().then(neko => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(neko.url)
                .setFooter("Potenciado por nekos.life")
            message.channel.send(embed)
        })
    }
}