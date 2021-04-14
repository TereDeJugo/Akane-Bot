const Discord = require("discord.js");

module.exports = {
    name: "clean",
    alias: [],
    description: "Limpia mensajes del chat",
    usage: "clean [numero de mensajes a borrar]",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Ey! no veo tus permisos para Administrar Mensajes");
        }

        if (!args[0]) {
            return message.channel.send("Debes especificar cuantos mensajes quieres que borre");
        }
        if (isNaN(args[0]) || args[0] > 100 || args[0] < 2) {
            return message.channel.send("Debes especificar el numero de mensajes que quieres que borre");
        }

        message.channel.messages.fetch({limit: 100}).then(messages => message.channel.bulkDelete(parseInt(args[0])));

        setTimeout(() => {
            message.channel.send(`Eh borrado ${parseInt(args[0])} mensajes!`);
        }, 1000);
    }
};

module.exports.help = {
    name: "clean",
    alias: ["purge"],
    perms: ["MANAGE_MESSAGES"],
    description: "Limpiare los mensajes del chat!",
    usage: "clean [numero de mensajes a borrar]",
    category: "Moderacion",
}