const { bot_default } = require("../modules/util.js");
const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = (client, guild) => {    
    if(bot.has(guild.id)) {
        return;
    } else {
        bot.set(guild.id, bot_default)
    }
}