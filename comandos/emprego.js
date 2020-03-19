const Discord = require("discord.js"),
Job = require("../models/ModelJob"),
fuc = require("../Functions/functions"),
prox = require("../Functions/continue");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    
    const embedResponse = new Discord.RichEmbed()
        .setColor("#"+fuc.getColor())
        .setTitle("**Dados de profissão**")
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL);

    message.channel.send(embedResponse);

    if(args[0] && args[0].toLowerCase() === "create") {
        if(usuario !== null && user.cargo > 0) return message.reply("Você não tem permissão para executar esse comando.");
        message.channel.send("Você iniciou uma sessão de criação de emprego.");
        message.channel.send("**[Sessão] Por favor digite o id do emprego »**");
        prox.add(author.user.id, "create_job");
    }
};
exports.config ={
    name: 'emprego',
    status: true,
    help: 'Esse comando serve para gerencionar seu emprego.',
    emojicommand: '🧰',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
};