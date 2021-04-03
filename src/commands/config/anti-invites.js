const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "anti-invites",
    alias: ["antiinvites"],
    description: "Activa o Desactiva las invitaciones del servidor",
    usage: "anti-invites <on | off>",
    category: "Configuracion",
    run: (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Debes especificar on o off");
        }

        if (args[0].toLowerCase() == "on") {
            if (!args[1]) {
                return message.channel.send("Debes poner los canales desactivados o en su defecto `none`");
            }
            if (args[1].toLowerCase() == "none") {
                bot.set(`${message.guild.id}.anti_invites`, "none")
            }
            else {
                let channels = args.slice(1) || message.mentions.channels.map(e => e.id);
                let ch_arr = [];

                channels.forEach(i => {
                    let ch = message.guild.channels.cache.get(i);

                    if (!ch) {
                        return message.channel.send("Uno de los canales especificados no fue encontrado");
                    } 
                    else {
                        ch_arr.push(ch.id);
                    }
                })

                if (ch_arr.length > 0) {
                    bot.set(`${message.guild.id}.anti_invites`, ch_arr);
                    return message.channel.send("Anti invitaciones activado");
                }
            }
        }

        if (args[0].toLowerCase() == "off") {
            if (!bot.has(`${message.guild.id}.anti_invites`)) {
                return message.channel.send("No hay anti invitaciones en este servidor.");
            }
            else {
                bot.delete(`${message.guild.id}.anti_invites`, false);
            }

            return message.channel.send("He desactivado el anti invitaciones!");
        }

        else {
            return message.channel.send("Debes especificar on o off");
        }
    }
}