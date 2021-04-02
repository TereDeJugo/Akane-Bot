const { bot_default } = require("../util.js");
const db = require("megadb");
const bot = new db.crearDB("bot_data")

module.exports = async (client, ready) => {
    console.log("Akane esta prendida!");
    client.user.setActivity("e!help | e!invite", { type: "WATCHING" });

    /*

    let guilds = client.guilds.cache.map(g => g.id)

    guilds.forEach(g => {
        bot.set(g, bot_default)
    })

    */

}
