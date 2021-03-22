const Discord = require("discord.js");

module.exports = {
    name: "channelinfo",
    alias: ["chinfo"],
    description: "Ve la informacion de un canal",
    usage: "channelinfo [mention | id]",
    category: "Informacion",
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("Mencioname un canal o la id de uno!");

        const type = {
            text: "Texto",
            rules: "Reglas",
            voice: "Voz",
            news: "Anuncios"
        };

        let description = channel.topic;
        if (!description) {
            description = "No tiene";
        }

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(`Esta es la informacion del canal #${channel.name}`)
            .addFields(
                { name: ":id: | ID", value: channel.id },
                { name: ":scroll:  | Descripcion", value: description },
                { name: ":bee: | Tipo:", value: type[channel.type] },
                { name: ":file_folder: | Categoria:", value: channel.parent.name }
            );
        message.channel.send(embed);
    }
};
