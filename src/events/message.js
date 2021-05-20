// Require packages

const db = require("megadb");
const bot = new db.crearDB("bot_data");

const invites = new db.crearDB("invites");
const cooldowns = new db.crearDB("cooldowns");
const currency = new db.crearDB("currency");

const { bot_default } = require("../modules/util.js");

module.exports = async (client, message) => {
    if (message.channel.type == "dm" || !message.guild.me.hasPermission("SEND_MESSAGES")) {
        return;
    }

    if (!bot.has(message.guild.id)) {
        bot.set(message.guild.id, bot_default)
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

     if(message.author.bot) return;

    // Verify currency

    if(currency.has(message.author.id)) {
        const xpForAdd = Math.floor(Math.random() * 5) + 1;
        
        const userDB = await currency.get(message.author.id);
        const levelUp = 5 * userDB.level + 50 * userDB.level;

        if(message.content.length >= 12) {
            currency.add(`${message.author.id}.xp`, xpForAdd);

            newUserXP = currency.get(`${message.author.id}.xp`)
            
            if(userDB.xp >= levelUp) {
                message.channel.send(`Felicidades! has subido de nivel, ahora eres nivel ${userDB.level + 1}`);
                currency.add(`${message.author.id}.level`, 1);
            }
        }        
    } else {       
        currency.set(message.author.id, {
            xp: 0,
            level: 1,
            description: "Las personas protegemos la ley"
        })
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();

    let cmd = client.commands.get(command) || client.aliases.get(command);
    if (!cmd) return;

    // Verify perms

    /* const perms = cmd.help.perms;

    if (perms) {
        perms.forEach(p => {
            let perm = message.guild.me.hasPermission(p)

            if (!perm) {
                return message.channel.send("Lo siento, no tengo los permisos suficientes para ejecutar este comando!")
            }
        })
    }
    */

    // Verify cooldown

    if (cooldowns.has(message.guild.id)) {
        let cool = await cooldowns.get(message.guild.id);
        if (cool.includes(message.author.id)) {
            return message.channel.send("Debes esperar almenos unos segundos para usar otro comando!");
        }
    }

    if (cmd.category == "Configuracion" && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("No veo tus permisos de administrador para usar este comando.")
    }

    if (cmd.category == "Owner" && message.author.id != "632319035102462004") {
        return message.channel.send("Solo mi owner puede usar este comando!")
    }


    cmd.run(client, message, args);

    // Cooldown Verification.

    if (!cooldowns.has(message.guild.id)) {
        cooldowns.set(message.guild.id, [])
    }

    cooldowns.push(message.guild.id, message.author.id);

    setTimeout(() => {
        cooldowns.delete(message.guild.id)
    }, 5000)
};