const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server-icon",
    alias: ["servericon", "serveravatar"],
    perms: [],
    description: "Te muestro el avatar del servidor!",
    usage: "server-icon",
    category: "Utilidad",
    run: (client, message, args) => {
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Aquí esta el icono del servidor!`)
            .setImage(message.guild.iconURL({dynamic: true, size: 2048}));

        message.channel.send(embed);
    }
};
