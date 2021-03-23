const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  alias: ["userimage", "usericon", "icon"],
  description: "Te muestra tu avatar o el de otro usuario",
  usage: "avatar [mention]",
  category: "Utilidad",
  run: (client, message, args) => {
    let description;
    let user = message.mentions.users.first() || message.author;

    switch (user) {
      case message.mentions.users.first():
        {
          description = `Aqui esta el avatar de ${
            message.mentions.users.first().username
          }`;
        }
        break;

      case message.author: {
        description = `Aqui esta tu avatar!`;
      }
    }

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(description)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

    message.channel.send(embed);
  }
};
