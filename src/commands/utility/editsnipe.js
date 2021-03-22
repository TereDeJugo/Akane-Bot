const Discord = require("discord.js");
const db = require("megadb");
const editsnipes = new db.crearDB("editsnipes");

module.exports = {
    name: "editsnipe",
    alias: ["editsnipes", "esp"],
    description: "Ve un mensaje recientemente editado.",
    usage: "editsnipe",
    category: "Utilidad",
    run: async (client, message, args) => {
        if (!editsnipes.has(message.channel.id)) {
            return message.channel.send("Ningun mensaje se ha editado")
        } else {
            editsnipe = await editsnipes.get(message.channel.id);
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Mensaje editado de ${editsnipe.user}`)
                .setDescription(`**Mensaje Original:** ${editsnipe.old_content}\n**Mensaje Editado:** ${editsnipe.new_content}`)
                .setFooter(`Editado en #${editsnipe.channel}`)
                .setColor("RANDOM");
            message.channel.send(embed);
        }
    }
};
