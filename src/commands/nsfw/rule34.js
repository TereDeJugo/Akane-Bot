const Discord = require("discord.js");
const booru = require("booru");

module.exports = {
  name: "rule34",
  alias: ["r34"],
  category: "NSFW",
  run: (client, message, args) => {
    if (!message.channel.nsfw){
      return message.channel.send("Ey! Este canal no esta marcado como nsfw... Pervertido.");
    }
      
    const tags = args.join(" ");
    
    if (!tags) {
      booru.search("rule34", ["hentai"], { limit: 3, random: true })
      .then(posts => {
        for (let post of posts) {
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Resultado de la busqueda: ${tags}`)
            .setImage(post.fileUrl);

          message.channel.send({ embed });
        }
      })
      .catch(e => {
        return message.channel.send(`Eh tenido un error a la hora de ejecutar el comando, lo siento`)
      });
    } else {
      booru.search("rule34", [tags], { limit: 3, random: true })
      .then(posts => {
        for (let post of posts) {
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Resultado de la busqueda: ${tags}`)
            .setImage(post.fileUrl);

          message.channel.send({ embed });
        }
      })
      .catch(e => {
        return message.channel.send(`Eh tenido un error a la hora de ejecutar el comando, lo siento`)
      });
    }
    
    
  }
};
