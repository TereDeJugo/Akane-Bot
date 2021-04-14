const fs = require("fs")

module.exports = (Discord, client) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    client.randomJSON = async (f) => {
        let data = fs.readFileSync(f);
        const parse = JSON.parse(data).file;
        const result = await parse[Math.floor(Math.random() * parse.length)];
        return result;
    };
}