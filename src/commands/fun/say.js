const Discord = require("discord.js");

module.exports = {
    name: "say",
    alias: [],
    category: "Diversion",
    description: "Haz que Akane diga lo que quieras!",
    usage: "say <texto>",
    run: (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Ingresa el texto que quieras que diga...");
        }

        const newargs = args.join(" ").replace(/\<\@\&\d+\>/g, "**[mencion-rol]**").replace("@everyone", "everyone").replace("@here", "here");

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(newargs);
        } else {
            message.delete();
            return message.channel.send(newargs);
        }
    }
}