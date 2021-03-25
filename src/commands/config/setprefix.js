const db = require("megadb");
const prefixes = new db.crearDB("prefixes");

module.exports = {
    name: "setprefix",
    alias: ["prefix"],
    description: "Cambia el prefix de los comandos!",
    usage: "setprefix <prefix>",
    category: "Configuracion",
    run: (client, message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Ey, no veo tus permisos de administrador")
        }
        if (!args[0]) {
            return message.channel.send("Dime, ¿a que prefix quieres que cambie?");
        } else {
            prefixes.set(message.guild.id, args[0]);
            return message.channel.send(`He guardado mi nuevo prefix: **${args[0]}**`)
        }
    }
};
