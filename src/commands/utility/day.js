const { MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
    name: "day",
    alias: ["date"],
    description: "Te muestra el dia actual con una imagen del anime K-on",
    usage: "day <-1 o +1 (Pueden ser otros numeros)>",
    category: "Utilidad",
    run: (client, message, args) => {
        const dates = {
            "Monday": ["Lunes", "https://imgur.com/7VEjsDc.png"],
            "Tuesday": ["Martes", "https://imgur.com/w22DNYc.png"],
            "Wednesday": ["Miercoles", "https://imgur.com/paYKlCv.png"],
            "Thursday": ["Jueves", "https://imgur.com/NER6v79.png"],
            "Friday": ["Viernes", "https://imgur.com/AnMY9sL.png"],
            "Saturday": ["Sabado", "https://imgur.com/kPWyhRA.png"],
            "Sunday": ["Domingo", "https://imgur.com/cWYnSto.png"]
        }     

        const date = moment();
        date.tz("America/Argentina/Buenos_Aires")

        let text = "Hoy es";
        let isMore = false;
        let isMenor = false;

        if(parseInt(args[0])) {
            let forAdd = parseInt(args[0]);

            if(forAdd > 1000 || forAdd < -1000) {
                return message.channel.send("El numero de dias para restar o sumar es demasiado alto/bajo!")
            }

            if(forAdd > 0) isMore = true;
            if(forAdd < 0) isMenor = true;

            if(isMenor) {
                text = "Fue"
            } 
            else if(isMore) {
                text = "Va a ser"
            } else {
                text = "Hoy es"
            }

            date.add(forAdd, "d");
            isMore = true;
        }

        const dateNow = date.format("dddd");
        const dateNowS = date.format("MMMM Do YYYY")

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${text} ${dates[dateNow][0]}/${dateNow}`)
        .setImage(dates[dateNow][1])
        .setFooter(`Especificamente: ${dateNowS} | Zona Horaria de ARG/BA`);

        message.channel.send(embed)
    }
};
