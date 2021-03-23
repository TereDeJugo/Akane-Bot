const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos();
module.exports = {
    name: "yuri",
    alias: [],
    description: "Prueba y sabras.",
    usage: "Prueba y sabras.",
    category: "NSFW",
    run: (client, message, args) => {
        neko.nsfw.yuri().then(neko => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(neko.url)
                .setFooter("Potenciado por nekos.life");
            message.channel.send(embed);
        });
    }
};
