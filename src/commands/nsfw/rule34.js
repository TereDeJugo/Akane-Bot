const Discord = require("discord.js");
const booru = require("booru");

module.exports = {
    name: "rule34",
    alias: ["r34"],
    description: "Busca algo en la rule34",
    usage: "rule34 [busqueda]",
    category: "NSFW",
    run: (client, message, args) => {
        const tags = args.join(" ").toLowerCase();

        if (!tags) {
            booru.search("rule34", ["hentai"], { limit: 3, random: true })
                .then(posts => {
                    for (let post of posts) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`Resultado de la busqueda: ${tags}`)
                            .setImage(post.fileUrl);

                        message.channel.send({ embed });
                    }
                })
                .catch(e => {
                    return message.channel.send(`Eh tenido un error a la hora de ejecutar el comando, lo siento`)
                });
        } else {
            booru.search("rule34", [tags], { limit: 3, random: true })
                .then(posts => {
                    for (let post of posts) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`Resultado de la busqueda: ${tags}`)
                            .setImage(post.fileUrl);

                        message.channel.send({ embed });
                    }
                })
                .catch(e => {
                    return message.channel.send(`Eh tenido un error a la hora de ejecutar el comando, lo siento`)
                });
        }


    }
};
