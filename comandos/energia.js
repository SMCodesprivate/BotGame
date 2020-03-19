const Discord = require("discord.js"),
Job = require("../models/ModelJob"),
fuc = require("../Functions/functions"),
prox = require("../Functions/continue");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    const embed = new Discord.RichEmbed()
        .setColor("#"+fuc.getColor())
        .setTitle("**Seu level de energia atualmente**")
        .addBlankField()
        .setThumbnail(author.user.avatarURL)
        .addField("**Você tem "+user.energia+" e um total de "+user.limitenergia+"**", "**\n**")
        .addField("**Espere `"+fuc.msToHMS(15000*(user.limitenergia-user.energia))+"` para recarregar sua energia totalmente.**", "**\n**")
        .addField("**\n**", "*Clique aqui em baixo para eu te avisar quando sua energia recuperar 100%*")
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.tag+" - "+author.user.id, author.user.avatarURL);
    message.channel.send(embed).then(async msg => {
        if(user.energia >= user.limitenergia) return;
        msg.delete(30000).catch(O_o=>{});
        var test = 15000 * (user.limitenergia - user.energia);
        await msg.react("🕒");
        let filtro = (reaction, user) => user.id === message.author.id;
        const collector = msg.createReactionCollector(filtro, {max: 1, time: 30000});
        collector.on("collect", r => {
            if(r.emoji.name === "🕒") {
                const embedHour = new Discord.RichEmbed()
                    .setColor("#"+fuc.getColor())
                    .setTitle("**Seu level de energia atualmente**")
                    .addBlankField()
                    .setThumbnail(author.user.avatarURL)
                    .addField("**Irei te avisar quando sua energia recuperar totalmente por favor espere**", "**\n**")
                    .addBlankField()
                    .setTimestamp()
                    .setFooter(author.user.tag+" - "+author.user.id, author.user.avatarURL);
                msg.edit(embedHour).catch(O_o=>{});
            }
        });
    });
};
exports.config ={
    name: 'energia',
    status: true,
    help: 'Esse comando você pode verificar o nível de energia no momento em que o comando ser executado.',
    emojicommand: '⚡',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒',
    permission: 0
};