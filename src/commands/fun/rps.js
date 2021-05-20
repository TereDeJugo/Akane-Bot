module.exports = {
    name: "rps",
    alias: ["ppt"],
    perms: [],
    description: "Juega a piedra papel o tijeras junto a Akane!",
    usage: "rps <piedra | papel | tijeras>",
    category: "Diversion",
    run: (client, message, args) => {
        let answ = [];
        let random = Math.floor(Math.random() * answ.length);

        if (!args[0]) return message.channel.send("Debes elegir piedra, papel o tijeras");

        if (args[0].toLowerCase() == "piedra") {
            answ = [
                `Elijo Papel! Eh ganado ${message.author.username}, mas suerte la proxima.`,
                `Elijo Tijeras!, aish, has ganado ${message.author.username}, felicidades`,
                `Elijo Piedra!, Ah, al parecer es un empate ${message.author.username}!`
            ];

            message.channel.send(answ[random]);
        }
        if (args[0].toLowerCase() == "papel") {
            answ = [
                `Elijo Tijeras! Eh ganado ${message.author.username}, mas suerte la proxima.`,
                `Elijo Piedra!, aish, has ganado ${message.author.username}, felicidades`,
                `Elijo Papel!, Ah, al parecer es un empate ${message.author.username}!`
            ];

            message.channel.send(answ[random]);
        }
        if (args[0].toLowerCase() == "tijeras") {
            answ = [
                `Elijo Piedra! Eh ganado ${message.author.username}, mas suerte la proxima.`,
                `Elijo Papel!, aish, has ganado ${message.author.username}, felicidades`,
                `Elijo Tijeras!, Ah, al parecer es un empate ${message.author.username}!`
            ];

            message.channel.send(answ[random]);
        }
    }
};