const Discord = require("discord.js")
const db = require("megadb");
const bot = new db.crearDB("bot_data")

module.exports = {
    name: "unmute",
    alias: [],
    description: "Desmutea un usuario que ha sido silenciado con el comando `mute`",
    usage: "unmute <mencion | id>",
    category: "Moderacion",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.channel.send("Ey, no veo tus permisos para silenc:iar usuarios")
        } 
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Lo siento... No tengo los permisos para administrar roles")
        }

        let role_db = await bot.get(`${message.guild.id}.mute_role`);
        let role = await message.guild.roles.cache.get(role_db);

        if (!role) {
            bot.set(`${message.guild.id}.mute_role`, false);
            return message.channel.send("El rol de muteado no fue encontrado, vuelva a seleccionelo con `set-mute`");
        }
        
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) {
            return message.channel.send("Mencione a un usuario o introduzca su id")
        }
        if (!user.bannable) {
            return message.channel.send("No puedo desmutear a alguien con mayor rol que el mio.")
        } 
        if (!user.roles.cache.has(role)) {
            return message.channel.send("Este usuario no esta muteado.")
        }
        
        user.roles.remove(role).then( () => {
            return message.channel.send("Usuario desmuteado!")
        })
    }
}