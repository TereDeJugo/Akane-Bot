const { MessageEmbed } = require("discord.js");
const db = require("megadb");
const currency = new db.crearDB("currency");

module.exports = {
    name: "profile",
    alias: [],
    perms: [],
    description: "Mira tu perfil o el de otra persona!",
    usage: "profile [@mencion]",
    category: "Economia",
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.member;

        if(!currency.has(user.id)) {
            currency.set(user.id, {xp: 0, level: 1, description: "Las personas protegemos la ley"})
        }

        const userDB = await currency.get(user.id)

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Perfil de ${user.user.username}`)
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setDescription(userDB.description)
            .addFields(
                {name: "Nivel:", value: userDB.level},
                {name: "XP:", value: userDB.xp},)
        message.channel.send(embed);
    }
};