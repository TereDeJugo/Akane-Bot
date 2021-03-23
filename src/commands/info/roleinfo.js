const Discord = require("discord.js");

module.exports = {
    name: "roleinfo",
    alias: ["rol", "rolinfo"],
    description: "Ve la informacion de un rol del servidor!",
    usage: "roleinfo <mention | id>",
    category: "Informacion",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if (!role) return message.channel.send("Debes mencionar o colocar la id de un rol valido!");

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(`Informacion del rol ${role.name}`)
            .addFields(
                { name: ":id: | ID", value: role.id },
                { name: ":art: | Color", value: role.hexColor },
                { name: ":file_folder: | Poscision", value: role.rawPosition },
                { name: ":busts_in_silhouette: | Personas con el Rol", value: role.members.size });
        message.channel.send(embed);
    }
};