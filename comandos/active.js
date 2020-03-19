// Canal anunciar 'Teste': ^active <#643442917410603017>
// Canal anunciar 'BotRPG': ^active <#643443017168191496>
// Servidor 'Teste': 622951594547347466
// Servidor 'BotRPG': 639072723859013632
// Servidor do canal escolhido: guild.id
// Servidor local: message.mentions._guild.id
const Discord = require("discord.js");
const searchPrefix = require("../Functions/searchPrefix");
const addCAnunciar = require("../Functions/addCAnunciar");
exports.run = async (SMCodes, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para executar esse comando.");
    await searchPrefix(message.mentions._guild.id);
    if(!args[0]) return message.reply("Sintaxe incorreta utilize ``"+teste_prefixo+"active {#canal}``");
    var x = args[0].split("#");
    x = x[1].split(">");
    var canal = SMCodes.channels.get(x[0]);
    var { guild } = canal;
    if(!canal) return message.reply("Digite um canal válido desse servidor.");
    if(guild.id != message.mentions._guild.id) return message.reply("Você não pode setar o canal de anuncio sobre novidades sem estar no mesmo servidor do canal mencionado.");
    await addCAnunciar(x[0], message.author.id, guild.id, message.channel);
};
exports.config ={
    name: 'active',
    status: true,
    help: 'Com esse comando escolhe um canal para o bot anunciar as novidades do bot.',
    emojicommand: '✔',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙'
}