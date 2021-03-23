const Discord = require("discord.js")
const db = require("megadb");
const mutes = new db.crearDB("mutes");

module.exports = {
    name: "unmute",
    alias: [],
    description: "Desmutea un usuario que ha sido silenciado con el comando `mute`",
    usage: "unmute <mencion | id>",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!mutes.has(message.guild.id)) {
            return message.channel.send("No hay un rol de silenciado definido, definalo con `semute`")
        }
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.channel.send("Ey, no veo tus permisos para silenc:iar usuarios")
        } 
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Lo siento... No tengo los permisos para administrar roles")
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = await mutes.get(message.guild.id)
        let mute_role = await message.guild.roles.cache.get(role)

        if (!user) {
            return message.channel.send("No encuentro a ese usario por ninguna parte de la base de datos.")
        }
        if (!user.bannable) {
            return message.channel.send("No puedo dessilenciar a alguien con mayor rol que el mio.")
        } 
        if (!user.roles.cache.has(role)) {
            return message.channel.send("Este usuario no esta silenciado.")
        }
        
        user.roles.remove(role).then(x => {
            return message.channel.send("Usuario desilenciado!")
        })
    }
}