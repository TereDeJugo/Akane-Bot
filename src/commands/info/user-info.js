module.exports = {
  name: "user-info",
  alias: ["user", "userinfo"],
  description: "Consulta la informacion de un usuario o la tuya",
  usage: "userinfo [mencion | id]",
  category: "Informacion",
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");

    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    
    let presence = user.presence.activities[0]
    if(presence = "null") {
      presence = "No tiene"
    }
            

    let status;
    switch (user.presence.status) {
      case "online":
        status = "En linea";
        break;
      case "dnd":
        status = "No molestar";
        break;
      case "idle":
        status = "Ausente";
        break;
      case "offline": // En el caso offline..
        status = "Desconectado";
        break;
    }

    const embed = new MessageEmbed()
      .setTitle(`Informacion del usuario ${user.user.username}`)
      .setColor(`RANDOM`)
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields(
        {
          name: ":fish_cake: | Apodo: ",
          value: user.nickname
            ? user.nickname
            : "No tiene apodo",
          inline: true
        },
        {
          name: ":hash: | Tag: ",
          value: `#${user.user.discriminator}`,
          inline: true
        },
        {
          name: ":id: | ID: ",
          value: user.user.id
        },
        {
          name: ":balloon: | Actividad: ",
          value: status
        },
        {
          name: ":crystal_ball: | Estado: ",
          value: user.presence.activities[0]
            ? user.presence.activities[0].state 
            : "Sin estado",
          
          
          inline: true
        },
        {
          name: ":window: | Avatar link: ",
          value: `[Link](${user.user.displayAvatarURL()})`
        },
        {
          name: ":calendar: | Creacion de la cuenta: ",
          value: user.user.createdAt.toLocaleDateString("es-pe"),
          inline: true
        },
        {
          name: ":calendar_spiral: | Entrada al servidor: ",
          value: user.joinedAt.toLocaleDateString("es-pe"),
          inline: true
        },
      );

    await message.channel.send(embed);
  }
};
