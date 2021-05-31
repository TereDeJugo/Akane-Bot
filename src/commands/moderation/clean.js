const Discord = require("discord.js");

module.exports = {
    name: "clean",
    alias: [],
    perms: ["MANAGE_MESSAGES"],
    description: "Limpia mensajes del chat",
    usage: "clean [numero de mensajes a borrar]",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Ey! no veo tus permisos para Administrar Mensajes");
        }
        if (!args[0] || isNaN(args[0]) || args[0] > 100 || args[0] < 2) {
            return message.channel.send("Debes especificar en el comando la cantidad de mensajes a borrar, del 2 al 100.");
        }

        message.channel.messages.fetch({limit: 100}).then(messages => {
            message.channel.bulkDelete(parseInt(args[0])).then((a) => {
                return message.channel.send(`He borrado ${args[0]} mensajes!`);
            })
        })
        .catch(() => message.channel.send("Hubo un error, probablemente los mensajes tienen mas de 14 dias de antigedad"))
    }
};