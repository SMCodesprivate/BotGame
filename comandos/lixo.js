const Discord = require("discord.js"),
Job = require("../models/ModelJob"),
fuc = require("../Functions/functions"),
prox = require("../Functions/continue");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    message.channel.send("Você iniciou uma sessão de criação de lixo.");
    message.channel.send("**[Sessão]** Por favor digite o nome do lixo »");
    prox.add(author.user.id, "create_trash");
};
exports.config ={
    name: 'lixo',
    status: true,
    help: 'Esse comando serve para meu criador criar novos tipos de lixos.',
    emojicommand: '🚮',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒',
    permission: 0
};