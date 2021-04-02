const Discord = require("discord.js")
const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "mute",
    alias: [],
    description: "Mutea a un miembro para que no pueda hablar en el chat!",
    usage: "mute <mencion | id>",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.channel.send("Ey, no veo tus permisos para silenciar usuarios")
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Lo siento... No tengo los permisos para administrar roles")
        }

        let role_db = await bot.get(`${message.guild.id}.mute_role`);
        let role = await message.guild.roles.cache.get(role_db)

        if (!role) {
            bot.set(`${message.guild.id}.mute_role`, false);
            return message.channel.send("El rol de muteado no fue encontrado, vuelva a seleccionarlo con `set-mute`");
        }
        if (!args[0]) {
            return message.channel.send("Mencione o introduzca la id de un usuario para mutear!")
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ");

        if (!user) {
            return message.channel.send("No encuentro a ese usario por ninguna parte de la base de datos.")
        }

        if (user.id == message.author.id) {
            return message.channel.send("¿Quieres que te silencie a ti? ¿Eres tonto?");
        }

        if (user.id == client.user.id) {
            return message.channel.send("¿Quieres mutearme a **mi**?");
        }

        if (!user.bannable) {
            return message.channel.send("No puedo silenciar a alguien con mayor rol que el mio.")
        }

        if (user.roles.cache.has(role)) {
            return message.channel.send("Este usuario ya esta muteado.")
        }

        if (reason === undefined || reason === "") {
            reason = "Sin especificar"
        }

        user.roles.add(role).then( () => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`El usuario ${user.user.username} ah sido muteado`)
                .setDescription(`**Razon:** ${reason}`)
                .setFooter(`Muteado por ${message.author.username}`)
            message.channel.send(embed)
        })
    }
}