const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos();
module.exports = {
    name: "neko",
    alias: ["nekos", "nekotina"],
    description: "Prueba y sabras.",
    usage: "neko",
    category: "NSFW",
    run: (client, message, args) => {
        neko.nsfw.neko().then(neko => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(neko.url)
                .setFooter("Potenciado por nekos.life");
            message.channel.send(embed);
        });
    }
};
