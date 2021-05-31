const Discord = require("discord.js");

module.exports = {
    name: "leave-server",
    alias: [],
    perms: ["KICK_MEMBERS"],
    description: "Salte del servidor",
    usage: "leave-server",
    category: "Moderacion",
    run: (client, message, args) => {
        if (!message.member.bannable) {
            return message.channel.send("No puedo sacarte del servidor, probablemente tienes un rol mas alto que el mio...");
        } 

        message.member.kick("Se fue solo").then(() => {
            return message.channel.send(`El usuario ${message.author.username} se ha ido por su cuenta!`)
        })
    }
};