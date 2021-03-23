const Discord = require("discord.js");

module.exports = {
  name: "clean",
  alias: [],
  description: "Limpia mensajes del chat",
  usage: "clean [numero de mensajes a borrar]",
  category: "Moderacion",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Ey! no veo tus permisos para Administrar Mensajes");

    if (!args[0]) {
      return message.channel.send("Debes decirme cuantos mensajes quieres que borre");
    } else if (isNaN(args[0]) || args[0] > 100 || args[0] < 2) {
      return message.channel.send("Dime cuantos mensajes quieres que borre!, tiene que ser un numero del 2 al 100");
    }

    let cant = parseInt(args[0]);

    message.channel.messages
      .fetch({
        limit: 100
      })
      .then(messages => message.channel.bulkDelete(cant));
    setTimeout(() => {
      message.channel.send(`Eh borrado ${cant} mensajes!`);
    }, 1000);
  }
};
