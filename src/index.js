// Require Packaxes

const Discord = require('discord.js');
const fs = require('fs');

// Discord Client config

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
require("./modules/client.js")(Discord, client);

// Commands & Events Handler

for (dir of fs.readdirSync(__dirname + '/commands')) {
    for (file of fs.readdirSync(__dirname + "/commands/" + dir)) {
        if (file.endsWith(".js")) {
            let content = require(__dirname + `/commands/${dir}/${file}`);
            let name = content.name;

            client.commands.set(name, content);

            if (content.alias) {
                for (let alias of content.alias) {
                    client.aliases.set(alias, content);
                }
            }
        }
    }
}

for (const file of fs.readdirSync(__dirname + "/events")) {
    if (file.endsWith(".js")) {
        let name = file.substring(0, file.length - 3);
        let content = require(__dirname + `/events/${file}`);

        client.on(name, content.bind(null, client));
    }
}

// Login with Token

client.login(process.env.TOKEN);