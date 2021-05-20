const Discord = require("discord.js")

module.exports = {
    name: "eval",
    alias: ["evalue"],
    description: "Evalua un comando",
    category: "Owner",
    usage: "eval [script a evaluar]",
    run: async (client, message, args) => {
        try {
            if (!args.join(" ")) return message.channel.send('Que quieres evaluar LajBel?')
            const this_eval = eval(args.join(" "));


            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .addField("Entrada:", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField('Tipo de dato:', `\`\`\`js\n${typeof (this_eval)}\n\`\`\``, true)
                .addField("Salida:", `\`\`\`js\n${this_eval}\n\`\`\``)

            message.channel.send(embed)

        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setTitle('Hubo un error')
                .setDescription(`\`\`\`js\n${e}\n\`\`\``)
            message.channel.send(embed)

        }

    }
}
