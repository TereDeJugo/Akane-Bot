const db = require("megadb");
const prefixes = new db.crearDB("prefixes");
const invites = new db.crearDB("invites");

module.exports = async (client, message) => {
    let prefix = process.env.PREFIX
    if (prefixes.has(message.guild.id)) prefix = await prefixes.get(message.guild.id);

    if (invites.has(message.guild.id) && !message.member.hasPermission("ADMINISTRATOR")) {
        channels = await invites.get(message.guild.id);

        if (channels == "none") {
            if (message.content.match(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g)) {
                message.delete()
            }
        } else {
            for (let i = 0; i <= channels.length; i++) {
                let ch = message.guild.channels.cache.get(channels[i])
                if (ch) {
                    if (message.channel.id != ch.id) {
                        if (message.content.match(/(https:\/\/)?(discord.(gg|com)\/(invite\/\w+|\w+))/g)) {
                            message.delete()
                        }
                    } else {
                        break;
                    }
                } else {
                    return;
                }
            }
        }
    }

if (!message.content.startsWith(prefix) || message.author.bot) return;

let args = message.content.slice(prefix.length).split(/ +/);
let command = args.shift().toLowerCase();

let cmd = client.commands.get(command) || client.aliases.get(command);
if (!cmd) return;

if (cmd.category == "NSFW" && !message.channel.nsfw) {
    return message.channel.send("No puedes usar este comando si no estas en un canal **nsfw**")
}
if (cmd.category == "Configuracion" && !message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("No veo tus permisos de administrador para usar este comando.")
}

cmd.run(client, message, args);

};