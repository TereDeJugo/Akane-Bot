const { MessageEmbed } = require("discord.js");
const db = require("megadb");
const editSnipes = new db.crearDB("edit_snipes");

module.exports = {
    name: "edit-snipe",
    alias: ["editsnipe", "esp"],
    perms: [],
    description: "Ve un mensaje recientemente editado.",
    usage: "editsnipe",
    category: "Utilidad",
    run: async (client, message, args) => {
        if (!editSnipes.has(message.channel.id)) {
            return message.channel.send("Ningun mensaje se ha editado recientemente.")
        }
        else {
            editSnipe = await editSnipes.get(message.channel.id);
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Mensaje editado de ${editsnipe.user}`)
            .setDescription(`**Mensaje Original:** ${editsnipe.old_content}\n**Mensaje Editado:** ${editsnipe.new_content}`)
            .setFooter(`Editado en #${editsnipe.channel}`);

            message.channel.send(embed);
        }
    }
};
