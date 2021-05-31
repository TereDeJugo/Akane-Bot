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

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle("Centro de Ayuda de Akane Bot!")
            .setImage("https://pa1.narvii.com/6158/5db62d69ceadfc8cd9aa7740c3a09a1cf2cff2ea_hq.gif")
            .setDescription(`*La ley no protege a la gente, sino que la gente protege la ley...*`)
            .addFields(
                {name:`:beginner: | Prefix:`, value:`El prefix de este servidor es **${prefix}**`},

                {name:":bulb: | Principal:", value: "help - invite - prefix - vote" },
                {name: ":tada: | Diversion:", value: "8ball - say - rps - daily" },
                {name: ":nazar_amulet: | Reaccion:", value: "kiss - hug - sad - dance - psychopass - dominator - pose - chad - chora - salty - elegant"},
                {name: ":crystal_ball: | Informacion:", value: "server-info - user-info - emote-info - ch-info - role-info"},
                {name: ":books: | Utilidad:", value: "avatar - day - editsnipe - jumbo - ping - leave-server - server-icon - snipe - suggestion"},
                {name: ":coin: | Economia:", value: "profile - set-description" },
                {name: ":shield: | Seguridad y Mod:", value: "ban - kick - softban - clean - mute - unmute"},
                {name: ":gear: | Configuracion:", value: "set-prefix - set-suggestions - set-mute"},
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