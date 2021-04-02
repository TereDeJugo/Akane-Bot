const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "set-suggestions",
    alias: ["setsg", "setsuggestions"],
    description: "Selecciona el canal de sugerencias",
    usage: "set-suggestions [mencion | id]",
    category: "Configuracion",
    run: (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) {
            return message.channel.send("Debes mencionar un canal valido o la id de uno!");
        } else {
            bot.set(`${message.guild.id}.suggestion`, channel.id)
            message.channel.send(`He guardado ${channel} como el nuevo canal de sugerencias!`);
        }
    }
};
