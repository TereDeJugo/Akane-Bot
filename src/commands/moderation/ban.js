const Discord = require("discord.js");

module.exports = {
  name: "ban",
  alias: [],
  description: "Banea a un usuario",
  usage: "ban <mencion | id>",
  category: "Moderacion",
  run: (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("Ey! No veo tus permisos para banear");
    } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("Ehhm lo siento, no tengo los permisos para banear.");
    }

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");

    if (!args[0]) {
       return message.channel.send("Dime, a que usuario quieres banear?"); 
    } else if (!member) {
      return message.channel.send("No encuentro a ese usuario por ninguna parte de la base de datos."); //Si el bot no encuentra un usuario correspondiente a la busqueda
    } else if (member.id === message.author.id) {
      return message.channel.send("¿Quieres que te heche a ti? ¿Eres tonto?");
    } else if (member.id === client.user.id) {
      return message.channel.send("¿Quieres hecharme a **mi**?");
    } else if (!member.bannable) {
      return message.channel.send("No puedo banear a alguien con un rol mas alto que el mio"); //Si para el bot es imposible banear al usuario);
    } else if (member.id === undefined) {
      return message.channel.send("Ese usuario no esta en el servidor");
    } else if (reason === undefined || reason === "") {
      reason = "Sin Especificar";
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("Usuario Baneado")
      .setColor("0xff0000")
      .setThumbnail(member.user.displayAvatarURL())
      .addField(`ID del Usuario: `, member.id)
      .addField(`Moderador: `, message.author.username)
      .addField(`Razon: `, reason)
      .setImage("https://64.media.tumblr.com/093190a0ca254a89360a3f039994bd11/tumblr_mfsta9i5ry1qjpgvuo5_500.gif");

    
    member.ban({
      reason: reason
    }).then(ban => {
      return message.channel.send(embed);
    }).catch(e => {
        if (e) return message.channel.send(`Tuve un error a la hora de ejecutar el comando, porfavor, contactese con mi owner ${process.env.OWNER}`);
        console.log(`Ah habido un error a la hora de banear un usuario\n Informacion:\n ${e}`)
      });
  }
};
