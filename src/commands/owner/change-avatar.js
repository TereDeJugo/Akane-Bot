module.exports = {
    name: "change-avatar",
    alias: [],
    description: "Cambiame el avatar",
    category: "Owner",
    usage: "change-avatar [avatar]",
    run: async (client, message, args) => {
        if(!message.endsWith(".jpg") || !message.attachments.first() || message.attachments.first() == undefined) return message.channel.send("Tienes que enviar una imagen para mi nuevo avatar");
        client.user.setAvatar(message.attachments.first().url).then(() => message.channel.send("Ya he cambiado mi avatar!"))
    }
}
