const Discord = require('discord.js');

const msg1 = [
	'Tu Psychopass es Bajo ',
	'Tu Psychopass esta en un nivel optimo...',
	'¡Tu Psychopass esta por las nubes !',
	'Tu Psychopass es increiblemente bajo!',
	'¿Porque lo unico que hago es escaneaer psychopass?'
];
const msg2 = [
	'Tu Psychopass es Alto',
	'Ey! tu Psychopass no esta en buen estado!',
	'¿Quieres tomar un cafe y charlar sobre esto?',
	'Juegas mucho LoL, ¿Verdad ?',
	'Tal vez deberias comer mas saludable.',
	'Esto pasa por jugar mucho Counter Strike...'
];
const msg3 = [
	'Tu Psychopass es Inaceptable!',
	'No me acercare a esa cosa!',
	'Hum... ¿Te molestaria venir un minuto conmigo ?',
	'Creo que tenemos un problema tu y yo!'
];
const gifs = [
	'https://31.media.tumblr.com/1b5d41fd6686c4fcbbb96cc2fc72bd96/tumblr_mpsftzYDIA1qe4w7so1_500.gif',
	'https://data.whicdn.com/images/113732499/original.gif',
	'https://pa1.narvii.com/6885/1424ac3397b3bb432a96031d4c1c36915e80e5edr1-500-248_hq.gif',
	'https://data.whicdn.com/images/54653562/original.gif',
	'https://64.media.tumblr.com/4f79944d005301c2843ca2f0f593d2df/tumblr_ompffnPZBj1uqrdeoo1_500.gif',
	'https://38.media.tumblr.com/ba5eb554707b9874b77ec3f2284e308e/tumblr_nezutshRWb1rt9emuo2_500.gif',
	'https://giffiles.alphacoders.com/111/111568.gif',
	'https://data.whicdn.com/images/151177142/original.gif',
	'https://i.pinimg.com/originals/de/72/e4/de72e4f5fb3eccec89714c0f1e1214dc.gif'
];

module.exports = {
	name: 'psychopass',
	alias: ['psy'],
    perms: [],
	description: 'Consulta tu nivel de psychopass',
	usage: 'psychopass [@mencion]',
	category: 'Reaccion',
	run: (client, message, args) => {
		const psy_level = Math.floor(Math.random() * 400 + 1);

		let msg;

		if (psy_level < 99) {
			msg = msg1;
		} else if (psy_level > 100 && psy_level < 299) {
			msg = msg2;
		} else if (psy_level > 300) {
			msg = msg3;
		}

		let random = Math.floor(Math.random() * msg.length);
		let gif_random = Math.floor(Math.random() * gifs.length);

		let user = message.mentions.users.first() || message.author; 

		let embed = new Discord.MessageEmbed()
			.setColor('0x4ed1f5')
			.setDescription(msg[random])
			.setImage(gifs[gif_random])
			.setFooter(`${user.username} has sido escaneado con mi Dominator, tu coeficiente criminal es de ${psy_level}.`);
		message.channel.send(embed);
	}
};
