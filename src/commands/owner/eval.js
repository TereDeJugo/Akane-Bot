const Discord = require("discord.js")

module.exports = {
  name: "eval",
  alias: ["evalue"],
  description: "Evalua un comando",
  run: (client, message, args) => {
    
    if (message.author.id !== "572780426171777032") return message.channel.send("Solo mi creadora puede usar este comando!");
   
    try {
    
      if(args.join(' ').toLowerCase().includes(process.env.TOKEN)) return message.channel.send('Dou')

        const evaluar = args.join(" ");
        if(!evaluar) return message.channel.send('Que quieres evaluar Tere?') 
        const evaluado = eval(evaluar); 


        const embed = new Discord.MessageEmbed()
        .setColor("0x2ad1eb")
        .addField('Tipo.', `\`\`\`js\n${typeof(evaluado)}\n\`\`\``, true)
        .addField("Entrada.", `\`\`\`js\n${(args.join(" "))}\n\`\`\``)
        .addField("Salida.", `\`\`\`js\n${evaluado}\n\`\`\``) 

        message.channel.send(embed)

        } catch (e) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Hubo un error.')
            .setDescription(`\`\`\`js\n${e}\n\`\`\``)
            message.channel.send(embed)

        }
    
  }}
