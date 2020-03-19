const Discord = require("discord.js"),
fuc = require("../Functions/functions"),
User = require("../models/ModelUser");
exports.run = async (SMCodes, message, args, author, prefix) =>{
    if(!args[0]) return message.reply("sintaxe incorreta utilize » `"+prefix+"banb {@user}`.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.reply("Digite um usuário válido desse servidor");
    var usuario = await User.findOne({ user_id: member.user.id });
    var usuario_staffer = await fuc.verificationStaffer(usuario.user_id);
    if(usuario === null) return message.reply("O usuário mencionado não tem uma conta em nosso sistema.");
    if(usuario_staffer === true) return message.reply("Esse usuário é um staffer então você não poderá bani-lo.");
    if(usuario.banido === true) return message.reply("Esse usuário já está banido de nosso sistema.");
    usuario = await User.findOneAndUpdate({
        user_id: member.user.id
    }, {
        banido: true
    });
    message.reply("Você baniu o usuário "+member+" de nosso sistema ele não poderá executar mais nenhum comando.");
};
exports.config ={
    name: 'banb',
    status: true,
    help: 'Com esse comando um administrador do bot pode banir um usuário, e o usuário não conseguirá executar mais comandos.',
    emojicommand: '🆔',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒',
    permission: 2
}