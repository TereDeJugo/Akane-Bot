const db = require("megadb");
const snipes = new db.crearDB("snipes");

module.exports = async (client, message) => {    
    if (message.author.bot || message.webhookID) return;
    if (!message.content) return;

    snipes.set(message.channel.id, {
        content: message.content,
        user: message.author.tag,
        server: message.guild.id,
        channel: message.channel.name,
    })

    setTimeout(() => {
        snipes.delete(message.channel.id);
    }, 50000);
};
