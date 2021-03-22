const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const dirs = [
    __dirname + "/commands/main",
    __dirname + "/commands/info",
    __dirname + "/commands/config",
    __dirname + "/commands/fun",
    __dirname + "/commands/moderation",
    __dirname + "/commands/nsfw",
    __dirname + "/commands/psychopass",
    __dirname + "/commands/utility",
    __dirname + "/commands/owner",
];

dirs.forEach(x => {
    let file2 = fs.readdirSync(x);
    file2.forEach(async y => {
        let file = y;
        if (file.endsWith(".js")) {
            let content = await require(x + "/" + file);
            let name = content.name;

            client.commands.set(name, content);

            if (content.alias) {
                for (let alias of content.alias) {
                    client.aliases.set(alias, content);
                }
            }
        }
    });
});

for (const file of fs.readdirSync(__dirname + "/events")) {
    if (file.endsWith(".js")) {
        let name = file.substring(0, file.length - 3);
        let content = require(__dirname + `/events/${file}`);

        client.on(name, content.bind(null, client));
    }
}

client.login(process.env.TOKEN); 

// :D