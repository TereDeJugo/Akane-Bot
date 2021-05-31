const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    alias: ["userimage", "usericon", "icon"],
    perms: [],
    description: "Te muestra tu avatar o el de otro usuario",
    usage: "avatar [mention]",
    category: "Utilidad",
    run: (client, message, args) => {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || message.member;

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Avatar de ${user.user.username}`)
            .setImage(user.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        message.channel.send(embed);
    }
};
