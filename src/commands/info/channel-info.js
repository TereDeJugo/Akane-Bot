const Discord = require("discord.js");

module.exports = {
    name: "channel-info",
    alias: ["ch-info", "channelinfo", "chinfo"],
    perms: [],
    description: "Ve la informacion de un canal",
    usage: "channel-info <mencion | id>",
    category: "Informacion",
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) {
            return message.channel.send("Mencioname un canal o la id de uno!");
        }

        const type = {
            text: "Texto",
            rules: "Reglas",
            voice: "Voz",
            news: "Anuncios"
        };

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(`Esta es la informacion del canal #${channel.name}`)
            .addFields(
                { name: ":id: | ID", value: channel.id },
                { name: ":scroll:  | Descripcion", value: channel.topic ? channel.topic : "No tiene" },
                { name: ":bee: | Tipo:", value: type[channel.type] },
                { name: ":file_folder: | Categoria:", value: channel.parent.name }
            );
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "channel-info",
    alias: ["ch-info", "channelinfo", "chinfo"],
    perms: [],
    description: "Te mostrare informacion del canal!",
    usage: "channel-info <mencion | id>",
    category: "Info"
}