const Discord = require("discord.js");

module.exports = {
    name: "say",
    alias: [],
    perms: [],
    category: "Diversion",
    description: "Dire lo que quieras.",
    usage: "say <texto>",
    run: (client, message, args) => {
        let newargs;

        if (!args[0]) {
            return message.channel.send("Ingresa el texto que quieras que diga...");
        }

        if (message.member.hasPermission("ADMINISTRATOR")) {
            newargs = args.join(" ")
        } else {
            newargs = args.join(" ").replace(/\<\@\&\d+\>/g, "**[mencion-rol]**").replace("@everyone", "everyone").replace("@here", "here").replace(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g, "**[invite]**")
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(newargs);
        } else {
            message.delete();
            return message.channel.send(newargs);
        }
    }
}