const Discord = require("discord.js")

module.exports = {
  name: "eval",
  alias: ["evalue"],
  description: "Evalua un comando",
  run: (client, message, args) => {
    
    if (message.author.id !== "572780426171777032") return message.channel.send("Solo mi creadora puede usar este comando!");
   
    try {
        if(!args.join(" ")) return message.channel.send('Que quieres evaluar Tere?') 
        const this_eval = eval(args.join(" ")); 


        const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .addField("Entrada:", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
        .addField('Tipo de dato:', `\`\`\`js\n${typeof(this_eval)}\n\`\`\``, true)
        .addField("Salida:", `\`\`\`js\n${this_eval}\n\`\`\``) 

        message.channel.send(embed)

        } catch (e) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Hubo un error')
            .setDescription(`\`\`\`js\n${e}\n\`\`\``)
            message.channel.send(embed)

        }
    
  }}
