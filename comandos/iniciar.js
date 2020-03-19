const Discord = require("discord.js");
const User = require("../models/ModelUser");
const Skill = require("../models/ModelSkill");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    console.log(server.id);
    if(args[0]) {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Digite um usuário válido desse servidor");
        var user_args = await User.findOne({ user_id: member.user.id });
        if(user_args !== null) return message.reply("esse usuário já tem uma conta criada em nosso sistema.");
        user_args = await Skill.create({
            user_id: member.user.id,
            forcalevel: 10,
            minelevel: 10,
            qilevel: 100,
            speedlevel: 10,
            staminalevel: 50
        });
        user_args = await User.create({
            user_id: member.user.id,
            stats: "Nada",
            mining: false,
            level: 0,
            xp: 0,
            energia: 50,
            limitenergia: 50,
            money: 0,
            banido: false,
            picareta: 0,
            luck: 0,
            luck_xp: 0,
            luck_limiter: 1000,
            server_id: server.id
        });
        if(user_args) {
            message.reply("você criou uma conta para o "+member+" com sucesso, ele poderá aproveitar nossas funções.");
        }
        return;
    }
    var user = await User.findOne({ user_id: author.user.id });
    if(user == null) {
        user = await Skill.create({
            user_id: author.user.id,
            forcalevel: 10,
            minelevel: 10,
            qilevel: 100,
            speedlevel: 10,
            staminalevel: 50
        });
        user = await User.create({
            user_id: author.user.id,
            stats: "Nada",
            mining: false,
            level: 0,
            xp: 0,
            energia: 50,
            limitenergia: 50,
            money: 0,
            banido: false,
            picareta: 0,
            luck: 0,
            luck_xp: 0,
            luck_limiter: 1000,
            server_id: server.id
        });
        if(user) {
            message.reply("Sua conta foi criada com sucesso, você já pode aproveitar nossas funções.");
        }
    } else {
        message.reply("Você já tem uma conta criada em nosso sistema.")
    }
};
exports.config ={
    name: 'iniciar',
    status: true,
    help: 'Esse comando você cria uma conta em nosso rpg.',
    emojicommand: '⏱',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}