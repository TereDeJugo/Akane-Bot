const db = require("megadb");
const prefixes = new db.crearDB("prefixes");

module.exports = {
    name: "prefix",
    alias: [],
    description: "Te muestro mi prefix actual!",
    usage: "prefix",
    category: "Principal",
    run: async (client, message, args) => {
        let prefix = process.env.PREFIX;

        if (prefixes.has(message.guild.id)) {
            prefix = await prefixes.get(message.guild.id);
        }

        message.channel.send(`Mi prefix es: **${prefix}**, puedes cambiarlo con ${prefix}set-prefix`)
    }}