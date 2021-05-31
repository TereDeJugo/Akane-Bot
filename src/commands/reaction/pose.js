const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pose",
    alias: [],
    perms: [],
    description: "Posa como un jojo",
    usage: "pose [mencion]",
    category: "Reaccion",
    run: async (client, message, args) => {
        const res = await client.randomJSON("src/json/pose.json");
        const user = message.mentions.users.first();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**${message.author.username}** hace buenas poses ${user ? `a **${user.username}**` : ""}`)
            .setImage(res)
        message.channel.send(embed);
    }
};
