const Discord = require("discord.js")

module.exports = {
    name: "vote",
    alias: ["topgg"],
    description: "Vota por mi en top.gg!",
    usage: "vote",
    category: "Principal",
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle("¡Gracias por votarme!")
        .setDescription("[Aquí](https://top.gg/bot/822200902475710585/vote) puedes votar por mi")
        .setImage("https://31.media.tumblr.com/1f5458ad712fcc6809306c72e7d33be1/tumblr_mv3dn1FSsz1rxs7wjo1_500.gif")
        .setFooter("¡Recuerda volver a votar en 12 horas!")

        return message.channel.send(embed)
    }}