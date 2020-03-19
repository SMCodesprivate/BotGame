const Discord = require("discord.js");
const Cargos = require("../models/ModelCargos");
const User = require("../models/ModelUser");
const searchPrefix = require("../Functions/searchPrefix")
exports.run = async (SMCodes, message, args, author, prefix) =>{
    if(!args[1]) return message.reply("Sintaxe incorreta utilize, ``"+prefix+"setcargo {@user} {id_cargo}``");
    var verificarUser = await User.findOne({ user_id: message.author.id });
    if(verificarUser === null) return message.reply("Você não tem uma conta em nosso sistema.");
    if(verificarUser.cargo > Number(args[1])) return message.reply("Você não tem permissão para setar esse cargo para outros usuários.");
    let user_id = args[0].split("<@!");
    user_id = user_id[1].split(">");
    user_id = user_id[0];
    var user = message.guild.members.get(user_id);
    var verificarCargo = await Cargos.findOne({ level: args[1] });
    if(verificarCargo === null) return message.reply("O cargo mencionado não existe.");
    var verificar = await User.findOne({
        user_id
    });
    if(verificar === null) return message.reply("O usuário mencionado não possui uma conta em nosso sistema.");
    verificar = await User.findOneAndUpdate({
        user_id
    }, {
        cargo: Number(args[1])
    });
    message.channel.send(`Você setou o cargo ${verificarCargo.name} para o usuário ${user}.`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
};
exports.config ={
    name: 'setcargo',                                                                                                               
    status: true,
    help: 'Esse comando você seta um cargo para o usuário mencionado.',
    emojicommand: '🔑',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 3
}