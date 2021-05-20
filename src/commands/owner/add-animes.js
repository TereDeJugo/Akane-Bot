const { MessageEmbed } = require("discord.js")
const db = require("megadb")

const recommendedAnimes = new db.crearDB("recommended_animes");

module.exports = {
    name: "add-animes",
    alias: [],
    description: "Añade animes a la lista de Daily",
    usage: "add-animes [Nombre del anime]",
    category: "Owner",
    run: async (client, message, args) => {
        const animesFromArgs = args.join(" ");
        const animesForAdd = animesFromArgs.split(", ");

        for (let i = 0; i <= animesForAdd.length - 1; i++) {
            if (animesForAdd[i].length > 0) {
                recommendedAnimes.push("animes", animesForAdd[i]);
            }
        }

        message.channel.send("He añadido el/los anime/s!")
    }
}