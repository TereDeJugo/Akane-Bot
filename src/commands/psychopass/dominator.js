const Discord = require("discord.js");

module.exports = {
    name: "dominator",
    alias: ["dom"],
    description: "Usa el dominator en ti mismo o otro usuario",
    usage: "dominator <mencion | id>",
    category: "PsychoPass",
    run: async (client, message, args) => {
        let res = await client.rdm("src/json/dominator.json");

        let int_random = Math.floor(Math.random() * 400 + 1);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user;

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author.username} usa el dominator en ${(user) ? `${user.username}` : 
            "si mismo" }`)
            .setImage(res)
            .setFooter(`Nivel de PsychoPass de ${int_random}`);
        message.channel.send(embed);
    }
};
