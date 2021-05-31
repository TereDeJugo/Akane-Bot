const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "set-prefix",
    alias: ["setprefix"],
    perms: [],
    description: "Cambia el prefix de los comandos!",
    usage: "set-prefix <prefix>",
    category: "Configuracion",
    run: (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Dime, ¿a que prefix quieres que cambie?");
        } else {
            bot.set(`${message.guild.id}.prefix`, args[0]);
            return message.channel.send(`He guardado mi nuevo prefix: **${args[0]}**`)
        }
    }
};