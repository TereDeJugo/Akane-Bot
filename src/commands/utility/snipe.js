const Discord = require("discord.js")
const db = require("megadb")
const snipes = new db.crearDB("snipes");

module.exports = {
    name: "snipe",
    alias: ["snipes", "sp"],
    description: "Ve un mensaje recientemente borrado.",
    usage: "snipe",
    category: "Utilidad",
    run: async (client, message, args) => {

        if (!snipes.has(message.channel.id)) {
            return message.channel.send("No se ha borrado ningun mensaje.")
        } else {
            let snipe = await snipes.get(message.channel.id)
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Mensaje borrado de ${snipe.user}`)
                .setDescription(snipe.content)
                .setFooter(`Borrado en #${snipe.channel}`)
                .setColor("RANDOM");
            message.channel.send(embed);
        }
    }
};
