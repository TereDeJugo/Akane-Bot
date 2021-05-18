const Discord = require("discord.js");

module.exports = {
    name: "user-info",
    alias: ["user", "userinfo"],
    description: "Consulta la informacion de un usuario o la tuya",
    usage: "userinfo [mencion | id]",
    category: "Informacion",
    run: async (client, message, args) => {
        
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status = {
            online: "En linea",
            dnd: "No molestar",
            idle: "Ausente",
            offline: "Desconectado"
        }

        const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Informacion del usuario ${user.user.username}`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                {
                    name: ":fish_cake: | Apodo: ",
                    value: user.nickname ? user.nickname : "No tiene apodo",
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
                    value: status[user.presence.status]
                },
                {
                    name: ":crystal_ball: | Estado: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",
                    inline: true
                },
                {
                    name: ":window: | Avatar link: ",
                    value: `[Link](${user.user.displayAvatarURL()})`
                },
                {
                    name: ":calendar: | Creacion de la cuenta: ",
                    value: user.user.createdAt.toLocaleDateString(),
                    inline: true
                },
                {
                    name: ":calendar_spiral: | Entrada al servidor: ",
                    value: user.joinedAt.toLocaleDateString(),
                    inline: true
                },
            );

        await message.channel.send(embed);
    }
};

module.exports.help = {
    name: "user-info",
    alias: ["user", "userinfo"],
    perms: [],
    description: "Consulta la informacion de un usuario o la tuya",
    usage: "userinfo [mencion | id]",
    category: "Informacion",
};