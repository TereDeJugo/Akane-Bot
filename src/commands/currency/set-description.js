const db = require("megadb");
const currency = new db.crearDB("currency");

module.exports = {
    name: "set-description",
    alias: [],
    perms: [],
    description: "Ponle una bonita descripcion a tu perfil!",
    usage: "set-description [descripcion]",
    category: "Economia",
    run: async (client, message, args) => {
        if(!currency.has(message.author.id)) {
            currency.set(user.id, {xp: 0, level: 1, description: "Las personas protegemos la ley"})
        }

        const description = args.join(" ")
        const userDB = await currency.get(message.author.id)

        if(!description) {
            return message.channel.send("Debes decirme cual quieres que sea la descripcion de tu perfil!");
        }
        else if(description.length > 400) {
            return message.channel.send("La descripcion es demasiado larga!");
        }
        else {
            currency.set(`${message.author.id}.description`, description);
            return message.channel.send("La descripcion ha sido guardada en tu perfil!");
        }        
    }
};