const Discord = require("discord.js")
const db = require("megadb");
const bot = new db.crearDB("bot_data");

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
            bot.set(`${message.guild.id}.mute_role`, role.id);
            message.channel.send("El rol de silenciado ha sido guardado.");
        }
    }
}