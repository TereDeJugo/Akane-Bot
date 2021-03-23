const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos();
module.exports = {
    name: "trap",
    alias: [],
    description: "Prueba y sabras.",
    usage: "trap",
    category: "NSFW",
    run: (client, message, args) => {
        neko.nsfw.trap().then(neko => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(neko.url)
                .setFooter("Potenciado por nekos.life");
            message.channel.send(embed);
        });
    }
};
