const db = require("megadb");
const suggestions = new db.crearDB("suggestions")

module.exports = {
    name: "setsuggestion",
    alias: ["setsg", "setsuggestions"],
    description: "Selecciona el canal de sugerencias",
    usage: "setsuggestion [mencion | id]",
    category: "Configuracion",
    run: (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Ey! No veo tus permisos de Administrador");
        }

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) {
            return message.channel.send("Debes mencionar un canal valido o la id de uno!");
        } else {
            suggestions.set(message.guild.id, channel.id)
            message.channel.send(`He guardado ${channel} como el nuevo canal de sugerencias!`);
        }
    }
};
