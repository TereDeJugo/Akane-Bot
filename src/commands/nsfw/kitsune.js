const nekos = require("nekos.life");
const Discord = require("discord.js");
const neko = new nekos();
module.exports = {
  name: "kitsune",
  alias: [],
  category: "NSFW",
  run: (client, message, args) => {
    if (!message.channel.nsfw)
      return message.channel.send(
        "Ey! Este canal no esta marcado como nsfw... Pervertido."
      );
    neko.nsfw.kitsune().then(neko => {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(neko.url)
        .setFooter("Potenciado por nekos.life");
      message.channel.send(embed);
    });
  }
};
