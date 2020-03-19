const Discord = require("discord.js");
const User = require("../models/ModelUser");
const Picaretas = require("../models/ModelPicaretas");
const Mine = require("../models/ModelMinerios");
const addPicareta = require("../Functions/addPicareta");
const searchPrefix = require("../Functions/searchPrefix");
const searchMinerios = require("../Functions/searchMinerios");
exports.run = async (SMCodes, message, args) =>{
    var prefix = await searchPrefix(message.mentions._guild.id);
    let autor = message.guild.members.get(message.author.id);
    if(!args[0]) {
        const picaretas = await Picaretas.find();
        if(picaretas.length == 0) {
            const embedToEmpty = new Discord.RichEmbed()
                .setTitle("**Picaretas**")
                .setColor("#333333")
                .addBlankField()
                .addField("**Não temos nenhuma picareta disponível.**", "**Use ``"+prefix+"picaretas criar`` para criar um picareta.**")
                .addBlankField()
                .setTimestamp()
                .setFooter(message.author.username, autor.user.avatarURL);
            return message.channel.send(embedToEmpty);
        } else {
            const embedToListPicaretas = new Discord.RichEmbed()
                .setTitle("**`PICARETAS`**")
                .setColor("#444444")
                .addBlankField()
                .setTimestamp()
                .setFooter(message.author.username, autor.user.avatarURL);
            picaretas.map(picareta => {
                var { name, emoji, eficiencia, valor, dia, mes, ano } = picareta;
                embedToListPicaretas.addField("**Nome » **", name, false)
                .addField("**Emoji » **", emoji, false)
                .addField("**Eficiência » **", eficiencia, false)
                .addField("**Valor » **", valor, false)
                .addField("**Data de Criação » **", "Dia: "+dia+"\nMês: "+mes+"\nAno: "+ano)
                .addBlankField();
            });
            return message.channel.send(embedToListPicaretas);
        }
    }
    if(args[0]) {
        let a = args[0];
        if(args[0] == 'add' || args[0] == 'adicionar' || args[0] == 'create' || args[0] == 'criar') {
            if(!args[5]) {
                return message.reply("Sintaxe incorreta utilize, ``"+prefix+"picaretas "+args[0]+" {emoji} {eficiência} {valor} {durabilidade} '{nome_picareta}'``");
            } else {
                let x = "";
                args.map(arg => {
                    x = x+arg+" "
                })
                let toMessage = x.split("'");
                if(toMessage.length != 3) {
                    return message.reply("Sintaxe incorreta utilize, ``"+prefix+"picaretas "+args[0]+" {emoji} {eficiência} {valor} {durabilidade} '{nome_picareta}'``");
                }
                var emoji_id = args[1].split(":");
                emoji_id = emoji_id[2].split(">");
                emoji_id = emoji_id[0];
                const verificar = await Picaretas.findOne({ name: toMessage[1] });
                if(verificar == null) {
                    var data = new Date;
                    const informacoes = [
                        toMessage[1],
                        args[1],
                        emoji_id,
                        args[2],
                        args[3],
                        data.getDate(),
                        data.getMonth(),
                        data.getFullYear()
                    ];
                    const embedToListPicaretas = new Discord.RichEmbed()
                        .setTitle("***``Criador de picareta``***")
                        .setColor("#444444")
                        .addBlankField()
                        .addField("**Nome » **", toMessage[1], false)
                        .addField("**Emoji » **", args[1], false)
                        .addField("**Eficiência » **", args[2], false)
                        .addField("**Valor » **", args[3], false)
                        .addBlankField()
                        .setTimestamp()
                        .setFooter(message.author.username, autor.user.avatarURL);
                    message.channel.send(embedToListPicaretas);
                    return addPicareta(informacoes);
                } else {
                    const embedToFail = new Discord.RichEmbed()
                        .setTitle("***``Criador de picareta``***")
                        .setColor("#444444")
                        .addBlankField()
                        .addField("**Essa picareta já está registrada.**", "**Porfavor crie uma nova.**", false)
                        .addBlankField()
                        .setTimestamp()
                        .setFooter(message.author.username, autor.user.avatarURL);
                    return message.channel.send(embedToFail);
                }
            }
        }
    }
};
exports.config ={
    name: 'picaretas',
    status: true,
    help: 'Esse comando possui subcomandos, mas ele sózinho mostra as picaretas disponíveis.',
    emojicommand: '⛏',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}