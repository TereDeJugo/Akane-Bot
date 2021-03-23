const Discord = require("discord.js");
const gifs = [
  "https://riky9917.files.wordpress.com/2018/12/tumblr_nf190nx3bq1qa94xto1_500.gif",
  "https://i.pinimg.com/originals/1a/5c/de/1a5cdee6c8123023f9657113cebbc943.gif",
  "https://thumbs.gfycat.com/ScarceJoyousFinwhale-small.gif",
  "https://media.discordapp.net/attachments/762483431703183370/771173227816288256/source.gif",
  "https://images-ext-2.discordapp.net/external/EIOnonumZ41yKgTC_h4a4GqNWuXJMUPPD_NYV1GIvB0/https/64.media.tumblr.com/4f79944d005301c2843ca2f0f593d2df/tumblr_ompffnPZBj1uqrdeoo1_500.gif",
  "https://i.pinimg.com/originals/a8/38/45/a838450e609a12132b08a336bcc3f4f9.gif"
];

module.exports = {
  name: "dominator",
  alias: ["dom"],
  description: "Usa el dominator en ti mismo o otro usuario",
  usage: "dominator [mention | id]",
  category: "PsychoPass",
  run: (client, message, args) => {
    let random = Math.floor(Math.random() * gifs.length);
    let int_random = Math.floor(Math.random() * 400 + 1);
    let user = message.mentions.users.first();
    let description = `${message.author.username} Usa el Dominator en si mismo`;
    if (user) {
      description = `${message.author.username} Usa el Dominator en ${user.username}`;
    }

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(description)
      .setImage(gifs[random])
      .setFooter(`Nivel de PsychoPass de ${int_random}`);
    message.channel.send(embed);
  }
};
