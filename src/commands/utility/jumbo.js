const Discord = require("discord.js")

module.exports = {
  name: "jumbo",
  alias: ["e"],
  category: "Utilidad",
  run: async (client, message, args) => {
    
    let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
        if (!emoji) return message.channel.send("")
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`[Imagen Completa](${emoji.url})`)
    .setImage(emoji.url)
    
    message.channel.send(embed)
  }}