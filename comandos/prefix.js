const Discord = require("discord.js");
const addServer = require("../Functions/addServer");
const searchPrefix = require("../Functions/searchPrefix");
exports.run = async (SMCodes, message, args) => {
    if(!args[0]) return message.reply("Meu prefixo nesse servidor é: "+teste_prefixo+"");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão de administrador nesse servidor, então não pode trocar o prefixo.");
    await searchPrefix(message.mentions._guild.id);
    await addServer(message.mentions._guild.id, args[0]);
    if(error == false) {
        message.reply("Você setou o prefixo desse servidor como: "+args[0]);
    } else {
        message.reply("Digite um prefixo menor ou igual a 3.");
    }
};
exports.config ={
    name: 'prefix',
    status: true,
    help: 'Esse comando mostra o meu prefix, caso queira setar um prefix coloque um prefixo como argumento do comando.',
    emojicommand: '▪',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙'
}