const Discord = require("discord.js"),
Lixo = require("../models/ModelLixo"),
fuc = require("../Functions/functions");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    var embed = new Discord.RichEmbed()
        .setColor("#"+fuc.getColor())
        .setTitle("**Lista de lixos**")
        .setThumbnail(author.user.avatarURL)
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL),
    lixos = await Lixo.find();
    tt = false;
    for(var x = 0;x <= lixos.length-1;x++) {
        if(x <= 5) {
            embed.addField("**Nome »**", "```"+lixos[x].name+"```**\n**", true)
                .addField("**Preço »**", "```"+lixos[x].price+"```**\n**", true)
                .addField("**Raridade »**", "```"+lixos[x].rarity+"```**\n**", true);
        } else {
            tt = true;
        }
    }
    var pg = 0;
    message.channel.send(embed).then(async msg => {
        if(tt === true) {
            await msg.react("⏪");
            await msg.react("⏩");
            let filtro = (reaction, user) => (reaction.emoji.name === '⏩', '⏪')  && user.id === message.author.id;
            const collector = msg.createReactionCollector(filtro);
            collector.on("collect", r => {
                msg.reactions.forEach(reaction => {
                    reaction.remove(message.author.id);
                });
                switch(r.emoji.name) {
                    case '⏪':
                        if(!lixos[pg-1]) {
                            return message.reply("não temos mais nenhuma página sobre lixos.");
                        }
                        var embedEdit = new Discord.RichEmbed()
                            .setColor("#"+fuc.getColor())
                            .setTitle("**Lista de lixos**")
                            .setThumbnail(author.user.avatarURL)
                            .addBlankField()
                            .setTimestamp()
                            .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL);
                        for(var y = pg-1;y <= pg+1*4;y++) {
                            if(lixos[y] !== null) {
                                embedEdit.addField("**Nome »**", "```"+lixos[y].name+"```**\n**", true)
                                    .addField("**Preço »**", "```"+lixos[y].price+"```**\n**", true)
                                    .addField("**Raridade »**", "```"+lixos[y].rarity+"```**\n**", true);
                            }
                        }
                        msg.edit(embedEdit);
                        pg -= 1;
                    break;
                    case '⏩':
                        if(!lixos[pg+1*5+1]) return message.reply("não temos mais nenhuma página sobre lixos.");
                        var embedEdit = new Discord.RichEmbed()
                            .setColor("#"+fuc.getColor())
                            .setTitle("**Lista de lixos**")
                            .setThumbnail(author.user.avatarURL)
                            .addBlankField()
                            .setTimestamp()
                            .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL);
                        for(var y = pg+1*5+1;y <= pg+1*5+6;y++) {
                            if(lixos[y]) {
                                embedEdit.addField("**Nome »**", "```"+lixos[y].name+"```**\n**", true)
                                    .addField("**Preço »**", "```"+lixos[y].price+"```**\n**", true)
                                    .addField("**Raridade »**", "```"+lixos[y].rarity+"```**\n**", true);
                            }
                        }
                        msg.edit(embedEdit);
                        pg += 1;
                    break;
                }
            });
        }
    });
};
exports.config ={
    name: 'lixos',
    status: true,
    help: 'Esse comando um usuário pode ver a lista de lixos.',
    emojicommand: '🗒️',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}