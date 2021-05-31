// Require packages

const { crearDB } = require("megadb");
const bot = new crearDB("bot_data");
const cooldowns = new crearDB("cooldowns");
const currency = new crearDB("currency");

const { bot_default } = require("../modules/util.js");

module.exports = async (client, message) => {
    if (message.channel.id == "843303627064999956") {
        let guild = client.guilds.cache.get("819593108123287572");
        let channel = guild.channels.cache.get("819593108982988869");

        channel.startTyping();

        setTimeout(() => {
            channel.send(message.content).then(() => {
                channel.stopTyping();
            })
        }, 2000)
    };

    if (message.channel.type == "dm" || !message.guild.me.hasPermission("SEND_MESSAGES")) {
        return;
    }

    if (!bot.has(message.guild.id)) {
        bot.set(message.guild.id, bot_default)
    }

    let prefix = await bot.get(`${message.guild.id}.prefix`);

    if (message.author.bot) return;

    // Verify currency

    if (currency.has(message.author.id)) {
        const xpForAdd = Math.floor(Math.random() * 5) + 1;

        const userDB = await currency.get(message.author.id);
        const levelUp = 5 * userDB.level + 50 * userDB.level;

        if (message.content.length >= 12) {
            currency.add(`${message.author.id}.xp`, xpForAdd);

            newUserXP = currency.get(`${message.author.id}.xp`)

            if (userDB.xp >= levelUp) {
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

    const perms = cmd.perms;

    if (perms) {
        for (perm of perms) {
            if (!message.guild.me.hasPermission(perm)) {
                return message.channel.send("Lo siento, no tengo los permisos suficientes para ejecutar este comando!");
            }
        }
    }

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