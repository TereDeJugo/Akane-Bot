const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    alias: ["server"],
    category: "Informacion",
    run: async (client, message, args) => {

        const region = {
            europe: "Europa :flag_eu:",
            brazil: "Brasil :flag_br: ",
            hongkong: "Hong Kong :flag_hk:",
            japan: "Japón :flag_jp:",
            russia: "Rusia :flag_ru:",
            singapore: "Singapur :flag_sg:",
            southafrica: "Sudáfrica :flag_za:",
            sydney: "Sydney :flag_au:",
            "us-central": "Central US :flag_us:",
            "us-east": "Este US :flag_us:",
            "us-south": "Sur US :flag_us:",
            "us-west": "Oeste US :flag_us:",
            "vip-us-east": "VIP US Este :flag_us:",
            "eu-central": "Europa Central :flag_eu:",
            "eu-west": "Europa Oeste :flag_eu:",
            london: "London :flag_gb:",
            amsterdam: "Amsterdam :flag_nl:",
            india: "India :flag_in:"
        };

        const verif = {
            NONE: "Ningúno",
            LOW: "Bajo",
            MEDIUM: "Medio",
            HIGH: "Alto",
            VERY_HIGH: "Muy Alto"
        };

        const server_date = message.guild.createdAt.toDateString();

        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("RANDOM")
            .setAuthor(`Informacion del servidor ${message.guild.name}`)
            .addFields(
                { name: ":id: | ID", value: message.guild.id },
                { name: ":flag_white: | Region", value: region[message.guild.region] },
                { name: ":lock: | Nivel de verificacion", value: verif[message.guild.verificationLevel] },
                { name: ":crown: | Owner:", value: `<@${message.guild.ownerID}>`},
                { name: ":beginner: | Miembros", value: message.guild.memberCount },
                { name: ":robot: | Bots:", value: message.guild.members.cache.filter(m => m.user.bot).size },
                { name: ":calendar: | Fecha de Creacion", value: server_date},
                { name: ":art: | Roles", value: message.guild.roles.cache.size},
                { name: ":closed_umbrella: | Emojis", value: message.guild.emojis.cache.size});
        message.channel.send(embed);
    }
};
