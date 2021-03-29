const db = require("megadb");
const invites = new db.crearDB("invites")

module.exports = {
    name: "antinvites",
    alias: ["setantinivtes"],
    description: "Activa o Desactiva las invitaciones del servidor",
    usage: "antiinvites <on | off>",
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
                invites.set(message.guild.id, "none");
                return message.channel.send("Anti invitaciones activado")
            } else {
                let channels = args.slice(1);
                let ch_arr = [];

                channels.forEach(i => {
                    let ch = message.guild.channels.cache.get(i);

                    if (ch) {
                        ch_arr.push(ch.id);
                    } else {
                        return message.channel.send("Uno de los canales especificados no fue encontrado");
                    }
                })

                if (ch_arr.length > 0) {
                    invites.set(message.guild.id, ch_arr)
                    return message.channel.send("Anti invitaciones activado")
                }
            }
        }
        if (args[0].toLowerCase() == "off") {
            if (invites.has(message.guild.id)) {
                invites.delete(message.guild.id)
                return message.channel.send("He desactivado el anti invitaciones en el servidor");
            } else {
                return message.channel.send("He desactivado el anti invitaciones en el servidor");
            }
        }
    }
}