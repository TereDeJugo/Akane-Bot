const { crearDB } = require("megadb");
const cooldowns = new crearDB("cooldowns");

module.exports = async (client, ready) => {
    console.log("Akane esta prendida!");
    client.user.setActivity("e!help | e!invite", { type: "WATCHING" });
    cooldowns.purgeall();
}
