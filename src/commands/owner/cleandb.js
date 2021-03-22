const Discord = require("discord.js");
const db = require("megadb");

module.exports = {
  name: "cleandb",
  alias: ["purgedb"],
  description: "Evalua un comando",
  run: (client, message, args) => {
    if (message.author.id !== "572780426171777032")
      return message.channel.send("Solo mi creadora puede usar este comando!");

    const filter = msg => msg.author.id === "572780426171777032";
    
    if (db.existeDB(args[0])) {
      message.channel.awaitMessages(filter, {max: 1, time: 1000, errors: ["time"] }).then( m => {
        if(message.content == "no") {
          return("Oki, no la borrare.")
        } else if(message.content == "si") {
          const dbb = db.crearDB(`${args[0]}`) 
          dbb.purgeall()
        }
      });
    }
  }
};
