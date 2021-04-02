const Discord = require("discord.js");
const db = require("megadb");
const bot = new db.crearDB("bot_data")

module.exports = {
    name: "help",
    alias: ["commands"],
    description: "Recibe ayuda sobre el bot y sus comandos",
    usage: "help",
    category: "Principal",
    run: async (client, message, args) => {
        let prefix = await bot.get(`${message.guild.id}.prefix`);

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle("Centro de Ayuda de Akane Bot!")
                .setImage("https://pa1.narvii.com/6158/5db62d69ceadfc8cd9aa7740c3a09a1cf2cff2ea_hq.gif")
                .setDescription(`*La ley no protege a la gente, sino que la gente protege la ley...*\n\n y Yo estoy aqui para protejer la tuya y darte un poco de diversion!\n`)
                .addFields(
                    { name: ":beginner: | Prefix:", value: `El prefix de este servidor es **${prefix}**`, },
                    { name: ":bulb: | Principal:", value: "`help`, `invite`, `prefix`" },
                    { name: ":tada: | Diversion:", value: "`8ball`, `say`, `rps`" },
                    { name: ":crystal_ball: | Informacion:", value: "`server-info`, `user-info`, `emote-info`, `ch-info`, `role-info`" },
                    { name: ":books: | Utilidad:", value: "`avatar`, `editsnipe`, `jumbo`, `ping`, `snipe`, `suggestion`" },
                    { name: ":dna: | Psychopass:", value: "`psychopass`, `dominator`" },
                    { name: ":shield: | Seguridad y Mod:", value: "`ban`, `kick`, `softban`, `clean`, `mute`, `unmute`" },
                    { name: ":gear: | Configuracion:", value: "`set-prefix`, `set-suggestions`, `set-mute`, `anti-invites`" },
                )
                .setFooter(`Akane Tsunemori ${process.env.VERSION} | ${prefix}help [comando] para ayuda especifica!`);
            message.channel.send(embed);
        } else {
            let cmd = client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0].toLowerCase());
            if (cmd) {
                const cmd_embed = new Discord.MessageEmbed()
                    .setColor(process.env.COLOR)
                    .addFields(
                        { name: "Nombre del comando:", value: cmd.name },
                        { name: "Descripcion:", value: cmd.description },
                        { name: "Uso:", value: `\`\`\`${prefix}${cmd.usage}\`\`\`` })
                    .setFooter("[] - opcional | <> - obligatorio")
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