const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server_icon",
    alias: ["servericon", "serveravatar"],
    description: "Te muestro el avatar del servidor!",
    usage: "server_avatar",
    category: "Utilidad",
    run: (client, message, args) => {
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Aquí esta el icono del servidor!`)
            .setImage(message.guild.iconURL({dynamic: true, size: 2048}));

        message.channel.send(embed);
    }
};
