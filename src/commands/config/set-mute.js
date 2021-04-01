const Discord = require("discord.js")
const db = require("megadb");
const mutes = new db.crearDB("mutes");

module.exports = {
    name: "set-mute",
    alias: ["set-muterole", "setmute"],
    description: "Selecciona el rol para silenciar",
    usage: "set-mute <mencion | id>",
    category: "Configuracion",
    run: (client, message, args) => {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if (!role) {
            return message.channel.send("Debes introducir un rol valido, recomiendo que ese rol sea denegado de los permisos de escribir en los canales, para el buen funcionamiento del mute.")
        } else {
            mutes.set(message.guild.id, role.id)
            message.channel.send("El rol de silenciado ha sido guardado.")
        }
    }
}