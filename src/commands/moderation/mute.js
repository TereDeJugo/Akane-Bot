const Discord = require("discord.js")
const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "mute",
    alias: [],
    perms: ["MANAGE_ROLES"],
    description: "Mutea a un miembro para que no pueda hablar en el chat!",
    usage: "mute <mencion | id>",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.channel.send("Ey, no veo tus permisos para silenciar usuarios")
        }

        let role_db = await bot.get(`${message.guild.id}.mute_role`);
        let role = await message.guild.roles.cache.get(role_db)

        if (!role) {
            bot.set(`${message.guild.id}.mute_role`, false);
            return message.channel.send("El rol de muteado no fue encontrado, seleccionelo con `set-mute`");
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ");

        if (!user) {
            return message.channel.send("Mencione a un usuario o introduzca su id")
        }
        else if (user.id == message.author.id) {
            return message.channel.send("¿Quieres que te silencie a ti? ¿Eres tonto?");
        }
        else if (user.id == client.user.id) {
            return message.channel.send("¿Quieres silenciar a **mi**?");
        }
        else if (!user.bannable) {
            return message.channel.send("No puedo silenciar a alguien con mayor rol que el mio.")
        }
        else if (user.roles.cache.has(role)) {
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