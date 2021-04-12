const fs = require("fs")

const bot_default = {
        "prefix": "e!",
        "mute_role": false,
        "suggestion": false,
        "anti_invites": false
    }

module.exports = {
    bot_default
}

module.exports = (client) => {
    client.randomJSON = async (f) => {
    let data = fs.readFileSync(f);
    const parse = JSON.parse(data).file;
    const result = await parse[Math.floor(Math.random() * parse.length)];
    return result;
    };
}