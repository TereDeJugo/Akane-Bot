const Discord = require("discord.js")

module.exports = {
    name: "ping",
    alias: ["p"],
    description: "Muestra el ping de Akane",
    usage: "ping",
    category: "Utilidad",
    run: (client, message, args) => {
        message.channel.send("**Pong!**").then(msg => {
            setTimeout(() => {
                const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setDescription(`Mensaje: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI: ${Math.round(client.ws.ping)}ms`)
                msg.edit(embed)
            }, 1000);
        });
    }
};
 