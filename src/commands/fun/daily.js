const { MessageEmbed } = require("discord.js");
const db = require("megadb");
const mal = require("mal-scraper");

const recommendedAnimes = new db.crearDB("recommended_animes");

module.exports = {
    name: "daily",
    alias: ["animanga-daily"],
    category: "Diversion",
    description: "Te recomiendo un animanga aleatorio!",
    usage: "anime-daily",
    run: async (client, message, args) => {
        const animesArr = await recommendedAnimes.get("animes");
        const animeRandom = animesArr[Math.floor(Math.random() * animesArr.length)];

        mal.getInfoFromName(animeRandom).then(data => {
            const embed = new MessageEmbed()
            .setTitle("Aquí esta el animanga del dia que te recomiendo!")
            .setThumbnail(data.image)
            .addFields(
                {name: "Nombre:", value: data.title},
                {name: "Episodios:", value: data.episodes},
                {name: "Generos:", value: data.genres},
                {name: "Links", value: `[MyAnimeList](${data.url})`}
            )
            .setImage(data.picture)

            message.channel.send(embed);
        })
    }
}
