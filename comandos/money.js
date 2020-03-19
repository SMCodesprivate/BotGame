const Discord = require("discord.js");
const User = require("../models/ModelUser");
const addMoney = require('../Functions/addMoney');
const searchPrefix = require('../Functions/searchPrefix');
const removeMoney = require('../Functions/removeMoney');
const createRichEmbed = require("../Functions/createRichEmbed");
const fuc = require("../Functions/functions")
exports.run = async (SMCodes, message, args, author, prefix, server, user) => {
    if(user == null) message.reply("Você não tem uma conta registrada em nosso sistema, utilize `"+prefix+"iniciar`");
    if(!args[0]) {
        var { money } = user;
        let embedMoney = new Discord.RichEmbed()
            .setTitle("💸 Seu money")
            .setColor('#'+fuc.getColor())
            .setThumbnail(author.user.avatarURL)
            .addBlankField()
            .addField("**Seu money atual »**", "**```"+fuc.calculate(money, 2)+"```**", false)
            .addBlankField()
            .setTimestamp()
            .setFooter(author.user.tag+" - "+author.user.id, author.user.avatarURL);
        message.channel.send(embedMoney)
    } else {
        var commands = ["add", "remove"];
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(member != undefined) {
            const moneyUser = await User.findOne({ user_id: member.user.id });
            if(moneyUser == null) return message.reply("Esse usuário não tem uma conta registrada em nosso sistema.");
            let embedMoney = new Discord.RichEmbed()
                .setTitle("💸 Money de "+member.user.username)
                .setColor('#'+fuc.getColor())
                .setThumbnail(member.user.avatarURL)
                .addBlankField()
                .addField("**Seu money atual »**", "**```"+fuc.calculate(moneyUser.money, 2)+"```**", false)
                .addBlankField()
                .setTimestamp()
                .setFooter(author.user.tag+" - "+author.user.id, author.user.avatarURL);
            message.channel.send(embedMoney);
        }
        if(args[0] == commands[0]) {
            if(message.author.id == 360247173356584960) {
                if(!args[2]) return message.reply("Sintaxe incorreta utilize, `"+prefix+"money add {valor} {@usuario}`");
                if(isNaN(args[1]) === true) return message.reply("Digite um número como valor.");
                if(args[1] <= 0) return message.reply("Digite um número maior que 0.");
                let userMencionado = message.mentions.members.first() || message.guild.members.get(args[2]);
                let auto =  message.guild.members.get(message.author.id);
                let verificar = await User.findOne({ user_id: userMencionado.user.id });
                if(!verificar || verificar == null) return message.reply("Esse usuário não está registrado em nosso sistema.");
                var { money } = verificar;
                addMoney(args[1], userMencionado.user.id);
                let afsdfs = parseInt(money) + parseInt(args[1]);
                let embedAddMoney = new Discord.RichEmbed()
                    .setTitle("💰 Adicionado Money")
                    .setColor('#'+fuc.getColor())
                    .addBlankField()
                    .setThumbnail(userMencionado.user.avatarURL)
                    .addField("\nVocê adicionou: 💲"+fuc.calculate(Number(args[1]), 2), "Para: "+userMencionado.user.username, false)
                    .addField("\nDinheiro antes: 💲"+fuc.calculate(parseInt(money), 2), "Condições atual: 💲"+fuc.calculate(afsdfs, 2), false)
                    .setTimestamp()
                    .setFooter(message.author.username, auto.user.avatarURL);
                message.channel.send(embedAddMoney)
            } else {
                message.channel.send("Você não é um de nossos administrador.");
            }
        }
    }
};
exports.config ={
    name: 'money',
    status: true,
    help: 'Esse comando possui subcomandos, mas ele sózinho mostra meu money atual.',
    emojicommand: '💰',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}