const Discord = require("discord.js")

module.exports = {
    name: "invite",
    alias: [],
    description: "Te muestra los links de invitacion del bot y del servidor de soporte.",
    usage: "invite",
    category: "Principal",
    run: (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setAuthor("Muchas Gracias por invitarme a tu Servidor!")
            .setImage("https://i.pinimg.com/originals/38/d4/69/38d46918b66e08a2672450a3e62d085d.gif")
            .addFields(
                { name: ":star: | Invitacion del Bot", value: `[Gracias de nuevo!](${process.env.INVITE})` },
                { name: ":bulb: | Servidor de Soporte", value: `[Te ayudaran lo antes posible!](${process.env.SERVER})` })
            .setFooter(`Mi owner: ${process.env.OWNER}`);
        message.channel.send(embed);
    }
};
