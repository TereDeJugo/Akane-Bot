const db = require("megadb");
const invitesoff = new db.crearDB("invitesoff")

module.exports = {
    name: "antiinvites",
    alias: ["setantiinivtes"],
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
                invitesoff.set(message.guild.id, "none");
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
                    invitesoff.set(message.guild.id, ch_arr)
                    return message.channel.send("Anti invitaciones activado")
                }
            }
        }
        if (args[0].toLowerCase() == "off") {
            if (invitesoff.has(message.guild.id)) {
                invitesoff.delete(message.guild.id)
                return message.channel.send("He desactivado el anti invitaciones en el servidor");
            } else {
                return message.channel.send("He desactivado el anti invitaciones en el servidor");
            }
        }
    }
}