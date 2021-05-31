const Discord = require("discord.js")
const db = require("megadb");
const bot = new db.crearDB("bot_data")

module.exports = {
    name: "unmute",
    alias: [],
    perms: ["MANAGE_ROLES"],
    description: "Desmutea un usuario que ha sido silenciado con el comando `mute`",
    usage: "unmute <mencion | id>",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Ey, no veo tus permisos para administrar roles!")
        } 
        else if(!args[0]) {
            return messsage.channel.send("Especifica el usuario para desilenciar")
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role_db = await bot.get(`${message.guild.id}.mute_role`);
        let role = await message.guild.roles.cache.get(role_db);

        if (!role) {
            bot.set(`${message.guild.id}.mute_role`, false);
            return message.channel.send("El rol de muteado no fue encontrado, vuelva a seleccionelo con `set-mute`");
        }
        else if (!user) {
            return message.channel.send("Mencione a un usuario o introduzca su id")
        }
        else if (!user.bannable) {
            return message.channel.send("No puedo desmutear a alguien con mayor rol que el mio.")
        } 
        else if (!user.roles.cache.has(role)) {
            return message.channel.send("Este usuario no esta muteado.")
        }
        user.roles.remove(role).then( () => {
            return message.channel.send("Usuario desmuteado!")
        })
    }
}