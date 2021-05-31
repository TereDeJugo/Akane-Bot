const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    alias: [],
    perms: ["KICK_MEMBERS"],
    description: "Kickea a un usuario",
    usage: "kick <mencion | id>",
    category: "Moderacion",
    run: (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Ey! No veo tus permisos para kickear");
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ");

        if (!member) {
            return message.channel.send("No encuentro a ese usuario por ninguna parte de la base de datos.");
        } else if (member.id === message.author.id) {
            return message.channel.send("¿Quieres que te heche a ti? ¿Eres tonto?");
        } else if (member.id === client.user.id) {
            return message.channel.send("¿Quieres hecharme a **mi**?");
        } else if (!member.bannable) {
            return message.channel.send("No puedo kickear a alguien con un rol mas alto que el mio");
        } else if (!reason || reason === "") {
            reason = "Sin Especificar";
        }

        const embed = new MessageEmbed()
            .setTitle("Usuario Kickeado")
            .setColor("0xff0000")
            .setThumbnail(member.user.displayAvatarURL())
            .addField(`ID del Usuario: `, member.id)
            .addField(`Moderador: `, message.author.username)
            .addField(`Razon: `, reason)
            .setImage("https://64.media.tumblr.com/093190a0ca254a89360a3f039994bd11/tumblr_mfsta9i5ry1qjpgvuo5_500.gif");

        member.kick(reason).then(() => {
            return message.channel.send(embed)
        })
    }
};