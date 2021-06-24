const { MessageEmbed } = require("discord.js");
const { searchImages, SafeSearchType } = require("duck-duck-scrape");

module.exports = {
	name: "img",
	alias: ["image"],
	perms: [],
	description: "Busca imagenes con duck duck go!",
	usage: "img <busqueda>",
	category: "Utilidad",
	run: async (client, message, args) => {
		if(!args[0]) return message.channel.send("Debes especificar que imagen quieres buscar!");

		const images = [];
		var currentImage = 0;

		const results = await searchImages(args.join(" "), {
			safeSearch: SafeSearchType.STRICT
		});

		for(result of results.results) {
			images.push({title: result.title, image: result.image, url: result.url});
		}

		const embed = new MessageEmbed()
		.setColor("ORANGE")
		.setTitle(images[currentImage].title)
		.setURL(images[currentImage].url)
		.setImage(images[currentImage].image)
		.setFooter(`${currentImage+1}/${images.length+1}`);

		message.channel.send(embed).then(msg => {
			msg.react("⬅️").then(() => msg.react("➡️"));

			client.on("messageReactionAdd", (reaction, user) => {
				if(user.id != message.author.id || reaction.message.id != msg.id) return;

				if(reaction.emoji.name == "➡️") {
					if(currentImage == images.length) return;

					currentImage = currentImage + 1;

					embed.setTitle(images[currentImage].title);
					embed.setURL(images[currentImage].url)
					embed.setImage(images[currentImage].image);
					embed.setFooter(`${currentImage+1}/${images.length+1}`);

					msg.edit(embed);
				}
				else if(reaction.emoji.name == "⬅️") {
					if(currentImage == 0) return;

					currentImage = currentImage - 1;
					
					embed.setTitle(images[currentImage].title);
					embed.setURL(images[currentImage].url)
					embed.setImage(images[currentImage].image);
					embed.setFooter(`${currentImage+1}/${images.length+1}`);

					msg.edit(embed);
				}
			})
		});


	}
}