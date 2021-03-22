const Discord = require("discord.js");
const db = require("megadb");
const prefixes = new db.crearDB("prefixes");

module.exports = {
    name: "help",
    alias: ["commands"],
    description: "Recibe ayuda sobre el bot y sus comandos",
    usage: "help",
    category: "Principal",
    run: async (client, message, args) => {
        let prefix = process.env.PREFIX;
        let nsfw_description = `Debes poner ${prefix}help en un canal nsfw para poder ver estos comandos!`;

        if (prefixes.has(message.guild.id)) prefix = await prefixes.get(message.guild.id);
        if (message.channel.nsfw) nsfw_description = "`rule34`, `hentai`, `trap`, `yuri`, `boobs`, `feet`, `neko`, `kitsune`";

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle("Centro de Ayuda de Akane Bot!")
                .setImage("https://pa1.narvii.com/6158/5db62d69ceadfc8cd9aa7740c3a09a1cf2cff2ea_hq.gif")
                .setDescription(`*La ley no protege a la gente, sino que la gente protege la ley...*\n\n y Yo estoy aqui para protejer la tuya y darte un poco de diversion!`)
                .addFields(
                    { name: ":beginner: | Prefix:", value: `El prefix de este servidor es **${prefix}**`, },
                    { name: ":bulb: | Principal:", value: "`help`, `invite`" },
                    { name: ":tada: | Diversion:", value: "`8ball`, `say`, `rps`" },
                    { name: ":crystal_ball: | Informacion:", value: "`serverinfo`, `userinfo` `emoteinfo`, `channelinfo`, `roleinfo`" },
                    { name: ":books: | Utilidad:", value: "`avatar`, `editsnipe`, `jumbo`, `ping`, `snipe`, `suggestion`" },
                    { name: ":dna: | Psychopass:", value: "`psychopass`, `dominator`" },
                    { name: ":shield: | Seguridad y Staff:", value: "`ban`, `kick`, `softban`, `clean`, `mute`, `unmute`" },
                    { name: ":gear: | Configuracion:", value: "`setprefix`, `setsuggestion`, `setmute` " },
                    { name: ":no_entry: | NSFW:", value: nsfw_description },
                )
                .setFooter(`Akane Tsunemori ${process.env.VERSION} | ${prefix}help [comando] para ayuda especifica!`);
            message.channel.send(embed);
        } else {
            let cmd = client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0].toLowerCase());
            if (cmd) {
                if(cmd.category == "NSFW") {
                    return message.channel.send("Debes estar en un canal nsfw para recibir ayuda de este comando!")
                }
                const cmd_embed = new Discord.MessageEmbed()
                    .setColor(process.env.COLOR)
                    .addFields(
                        { name: "Nombre del comando:", value: cmd.name},
                        { name: "Descripcion:", value: cmd.description },
                        { name: "Uso:", value: `\`\`\`${prefix}${cmd.usage}\`\`\`` })
                if (cmd.alias[0]) {
                    cmd_embed.addFields(
                        { name: "Alias:", value: cmd.alias.join(" | ") });
                }
                message.channel.send(cmd_embed);
            } else {
                message.channel.send("Debes decirme un comando valido!");
            }
        }
    }
};