const db = require("megadb");
const bot = new db.crearDB("bot_data");

module.exports = {
    name: "prefix",
    alias: [],
    description: "Te muestro mi prefix actual!",
    usage: "prefix",
    category: "Principal",
    run: async (client, message, args) => {
        let prefix = await bot.get(`${message.guild.id}.prefix`)

        message.channel.send(`Mi prefix es: **${prefix}**, puedes cambiarlo con ${prefix}set-prefix`)
    }}

module.exports.help = {
    name: "prefix",
    alias: [],
    perms: [],
    description: "Te muestro mi prefix actual!",
    usage: "prefix",
    category: "Main",
}