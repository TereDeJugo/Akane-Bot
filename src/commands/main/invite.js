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
                { name: ":star: | Invitacion del Bot", value: `[Gracias de nuevo!](https://discord.com/oauth2/authorize?client_id=822200902475710585&scope=bot&permissions=8)` },
                { name: ":bulb: | Servidor de Soporte", value: `[Te ayudaran lo antes posible!](https://discord.gg/xrbakhHVjJ)` })
            .setFooter(`Mi owner: Tere De Jugo #6455`);
        message.channel.send(embed);
    }
};
