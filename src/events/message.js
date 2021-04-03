// Require packages

const db = require("megadb");
const bot = new db.crearDB("bot_data");
const invites = new db.crearDB("invites");
const cooldowns = new db.crearDB("cooldowns");

module.exports = async (client, message) => {
    if (message.channel.type == "dm" ) {
        return;
    }

    let prefix = await bot.get(`${message.guild.id}.prefix`);

    // Anti invites verify

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

    if (cooldowns.has(message.guild.id)) {
        let cool = await cooldowns.get(message.guild.id);
        if(cool.includes(message.author.id)) {
            return message.channel.send("Debes esperar almenos unos segundos para usar otro comando!");
        }
    }
    if (cmd.category == "Configuracion" && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("No veo tus permisos de administrador para usar este comando.")
    }


    cmd.run(client, message, args);

    // Cooldown Verification.

    if(!cooldowns.has(message.guild.id)) {
        cooldowns.set(message.guild.id, [])
    }

    cooldowns.push(message.guild.id, message.author.id);

    setTimeout(() => {
        cooldowns.delete(message.guild.id)
    }, 10000) 
};