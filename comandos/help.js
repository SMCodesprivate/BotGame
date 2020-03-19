const Discord = require("discord.js"),
Reg = require("../models/modelreg"),
Categoria = require("../models/modelcategorias"),
fs = require('fs'),
functions = require("../Functions/functions"),
Cargos = require("../models/ModelCargos");
exports.run = async (SMCodes, message, args, author, prefix) =>{
    const autor = message.channel.guild.members.get(message.author.id),
    bot = message.channel.guild.members.get(SMCodes.user.id),
    embed = new Discord.RichEmbed()
        .setTitle("📁 Categorias de Comandos.")
        .setColor('#'+functions.getColor())
        .setThumbnail(autor.user.avatarURL)
        .addBlankField()
        .setDescription("**Essas são as categorias dos comandos que estão disponíveis.**")
        .setTimestamp()
        .setFooter(message.author.tag+" - "+message.author.id, autor.user.avatarURL);
    var Categorias = await Categoria.find();
    if(args[0]) {
        for(var loop_cat = 0;loop_cat <= Categorias.length-1;loop_cat++) {
            if(args[0].toLowerCase() === Categorias[loop_cat].categoria.toLowerCase()) {
                message.delete().catch(O_o=>{});
                var embednew = new Discord.RichEmbed()
                    .setColor('#'+functions.getColor())
                    .setTitle("Categoria "+Categorias[loop_cat].categoria)
                    .setThumbnail(autor.user.avatarURL)
                    .addBlankField()
                    .setDescription('**Esses são os comandos da categoria '+Categorias[loop_cat].categoria+'.\nNo total são `'+JSON.parse(Categorias[loop_cat].comandos).length+'` comandos divirta-se**')
                    .setTimestamp()
                    .setFooter(message.author.tag+" - "+message.author.id, autor.user.avatarURL);
                var o = 1;
                JSON.parse(Categorias[loop_cat].comandos).map(cmd => {
                    var z = require("../"+cmd.path+"/"+cmd.name+".js");
                    embednew.addField('**'+o+'°- '+z.config.emojicommand+'  `'+prefix+z.config.name+'`**', z.config.help);
                    o++;
                });
                message.channel.send(embednew.addBlankField()).catch(O_o=>{});
                return;
            }
        }
    }
    if(args[0] === "admin") {
        var embedAdmin = new Discord.RichEmbed()
            .setColor("#"+functions.getColor())
            .setThumbnail(author.user.avatarURL)
            .setTitle("**__📑 Comandos para staffers do bot__**")
            .setDescription("**\nMeu prefix » `"+prefix+"`**")
            .addBlankField()
            .setTimestamp()
            .setFooter(author.user.tag, author.user.avatarURL);
        var cargos = await Cargos.find();
        for(var cargo_length = 0;cargo_length <= cargos.length-1;cargo_length++) {
            var cargo = cargos[cargo_length];
            var comandos_staff = "";
            var pushment = 0;
            for(var cg_length = 0;cg_length <= Categorias.length-1;cg_length++) {
                var cg = Categorias[cg_length];
                var commands = JSON.parse(cg.comandos);
                for(var cmd_length = 0;cmd_length <= commands.length-1;++cmd_length) {
                    var cmd = commands[cmd_length];
                    var file = require("../"+cmd.path+"/"+cmd.name+".js");
                    if(file.config.permission !== null && file.config.permission >= cargo.level) {
                        pushment += 1;
                        comandos_staff += "`"+file.config.name+"`, ";
                    }
                }
            }
            
            embedAdmin.addField("**"+cargo.emoji+" "+cargo.name+" ("+pushment+")**", comandos_staff.replace(/.$/, ""));
        }
        message.channel.send(embedAdmin.addBlankField());
        return;
    }
    for(var chd = 0;chd <= Categorias.length-1;chd++) {
        var cag = Categorias[chd];
        embed.addField(`**- ${cag.emoji} ${cag.categoria}.**`, `Comandos | ${JSON.parse(cag.comandos).length}`, false).addBlankField();
    }
    message.channel.send(embed).then(async msg => {
        msg.delete(30000).catch(O_o=>{});
        for(var o = 0;o <= Categorias.length-1;o++) {
            await msg.react(Categorias[o].emoji);
        }
        let filtro = (reaction, user) => user.id === message.author.id;
        const collector = msg.createReactionCollector(filtro, {max: 1, time: 30000});
        collector.on("collect", r => {
            Categorias.map(cg => {
                if(r.emoji.name === cg.emoji) {
                    var embednew = new Discord.RichEmbed()
                        .setColor('#'+functions.getColor())
                        .setTitle("Categoria "+cg.categoria)
                        .setThumbnail(autor.user.avatarURL)
                        .addBlankField()
                        .setDescription('**Esses são os comandos da categoria '+cg.categoria+'.\nNo total são `'+JSON.parse(cg.comandos).length+'` comandos divirta-se**')
                        .setTimestamp()
                        .setFooter(message.author.tag+" - "+message.author.id, autor.user.avatarURL);
                    var o = 1;
                    JSON.parse(cg.comandos).map(cmd => {
                        var z = require("../"+cmd.path+"/"+cmd.name+".js");
                        embednew.addField('**'+o+'°- '+z.config.emojicommand+'  `'+prefix+z.config.name+'`**', z.config.help);
                        o++;
                    });
                    msg.delete();
                    msg.channel.send(embednew.addBlankField()).then(async msg_emoji => {
                        msg_emoji.delete(30000).catch(O_o=>{});
                        await msg_emoji.react("⏪");
                        let filtro = (reaction, user) => user.id === message.author.id;
                        const collector = msg_emoji.createReactionCollector(filtro, {max: 1, time: 30000});
                        collector.on("collect", rm => {
                            if(rm.emoji.name === "⏪") {
                                msg_emoji.delete().catch(O_o=>{});
                                this.run(SMCodes, message, args, author, prefix);
                            }
                        });
                    }).catch(O_o=>{});
                }
            })
        });
    });
};
exports.config ={
    name: 'help',
    status: true,
    help: 'Esse comando serve para saber todos os comandos que eu possuo.',
    emojicommand: '🗒',
    aliases: ['comandos', 'ajuda'],
    category: 'Outros',
    categoryemoji: '🚥'
}