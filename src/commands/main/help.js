const Discord = require("discord.js");
const db = require("megadb");
const bot = new db.crearDB("bot_data")

module.exports = {
    name: "help",
    alias: ["commands"],
    perms: [],
    description: "Recibe ayuda sobre el bot y sus comandos",
    usage: "help",
    category: "Principal",
    run: async (client, message, args) => {
        let prefix = await bot.get(`${message.guild.id}.prefix`);

		const mainCommands = client.commands.filter(x => x.category == "Principal").map(x => "`" + x.name + "`").join(", ");
		const funCommands = client.commands.filter(x => x.category == "Diversion").map(x => "`" + x.name + "`").join(", ");
		const reactionCommands = client.commands.filter(x => x.category == "Reaccion").map(x => "`" + x.name + "`").join(", ");
		const infoCommands = client.commands.filter(x => x.category == "Informacion").map(x => "`" + x.name + "`").join(", ");
		const utilCommands = client.commands.filter(x => x.category == "Utilidad").map(x => "`" + x.name + "`").join(", ");
		const currencyCommands = client.commands.filter(x => x.category == "Economia").map(x => "`" + x.name + "`").join(", ");
		const modCommands = client.commands.filter(x => x.category == "Moderacion").map(x => "`" + x.name + "`").join(", ");
		const configCommands = client.commands.filter(x => x.category == "Configuracion").map(x => "`" + x.name + "`").join(", ");

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle("Centro de Ayuda de Akane Bot!")
            .setImage("https://pa1.narvii.com/6158/5db62d69ceadfc8cd9aa7740c3a09a1cf2cff2ea_hq.gif")
            .setDescription(`*La ley no protege a la gente, sino que la gente protege la ley...*`)
            .addFields(
                {name:`:beginner: | Prefix:`, value:`El prefix de este servidor es **${prefix}**`},
                {name:":bulb: | Principal:", value: mainCommands},
                {name: ":tada: | Diversion:", value: funCommands},
                {name: ":nazar_amulet: | Reaccion:", value: reactionCommands},
                {name: ":crystal_ball: | Informacion:", value: infoCommands},
                {name: ":books: | Utilidad:", value: utilCommands},
                {name: ":coin: | Economia:", value: currencyCommands},
                {name: ":shield: | Seguridad y Mod:", value: modCommands},
                {name: ":gear: | Configuracion:", value: configCommands},
            )
            .setFooter(`Akane Tsunemori Bot 1.5.9 | ${prefix}help [comando] para ayuda especifica!`);
            
            message.channel.send(embed);
        } else {
            let cmd = client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0].toLowerCase());
            if (cmd) {
                const cmdEmbed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .addFields(
                    {name: "Nombre del comando:", value: cmd.name},
                    {name: "Descripcion:", value: cmd.description},
                    {name: "Uso:", value: `\`\`\`${prefix}${cmd.usage}\`\`\`` })
                .setFooter("[] - opcional | <> - obligatorio")
                if (cmd.alias[0]) {
                    cmd_embed.addFields(
                        {name: "Alias:", value: cmd.alias.join(" | ")});
                }
                message.channel.send(cmd_embed);
            } else {
                message.channel.send("Debes decirme un comando valido!");
            }
        }
    }
};