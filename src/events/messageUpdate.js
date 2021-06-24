const db = require("megadb");
const editSnipes = new db.crearDB("edit_snipes");

module.exports = async (client, oldMessage, newMessage) => {
    if(!oldMessage.author || oldMessage.weebhookID || oldMessage.author.bot || !oldMessage.content) return;
    
    editSnipes.set(oldMessage.channel.id, {
        old_content: oldMessage.content,
        new_content: newMessage.content,
        user: oldMessage.author.tag,
        server: oldMessage.guild.id,
        channel: oldMessage.channel.name
    })

    setTimeout(() => {
        editSnipes.delete(oldMessage.channel.id);
    }, 50000);
};
