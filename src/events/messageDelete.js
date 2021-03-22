module.exports = async (client, message) => {
  const db = require("megadb");
  let snipes = new db.crearDB("snipes");
  
  if (message.author.bot) return;

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
     