const db = require("megadb");
const prefixes = new db.crearDB("prefixes");

module.exports = async (client, message) => {
    let prefix = process.env.PREFIX
    if (prefixes.has(message.guild.id)) prefix = await prefixes.get(message.guild.id);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();

    let cmd = client.commands.get(command) || client.aliases.get(command);
    if (!cmd) return;
    if(cmd.category == "NSFW" && !message.channel.nsfw) {
        return message.channel.send("No puedes usar este comando si no estas en un canal **nsfw**")
    }
    
    cmd.run(client, message, args);
};
