const Discord = require("discord.js")

module.exports = {
    name: "ping",
    alias: ["p"],
    description: "Muestra el ping de Akane",
    usage: "ping",
    category: "Utilidad",
    run: (client, message, args) => {
        message.channel.send("Pong dice que").then(msg => {
            setTimeout(() => {
                msg.edit("Tengo un ping de " + (Date.now() - msg.createdTimestamp));
            }, 1000);
        });
    }
};
