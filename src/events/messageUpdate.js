const db = require("megadb");
const editsnipes = new db.crearDB("editsnipes");

module.exports = async (client, oldMessage, newMessage) => {

    if (!oldMessage.content) {
        return;
    }

    editsnipes.set(oldMessage.channel.id, {
        old_content: oldMessage.content,
        new_content: newMessage.content,
        user: oldMessage.author.tag,
        server: oldMessage.guild.id,
        channel: oldMessage.channel.name
    }),
        setTimeout(() => {
            editsnipes.delete(oldMessage.channel.id);
        }, 50000);
};
