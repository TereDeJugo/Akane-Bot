const { MessageAttachment } = require("discord.js")

module.exports = {
    name: "trolled",
    alias: [],
    description: "Troleado",
    usage: "trolled",
    category: "Secreto",
    run: async (client, message, args) => {    
        const attachment = new MessageAttachment(
            "https://cdn.discordapp.com/attachments/763477488859873280/780965471712706560/trolled-1.mp4"
        );

        message.channel.send(attachment)
    }
};