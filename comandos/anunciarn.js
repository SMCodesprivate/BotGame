// Canal anunciar 'Teste': ^active <#643442917410603017>
// Canal anunciar 'BotRPG': ^active <#643443017168191496>
// Servidor 'Teste': 622951594547347466
// Servidor 'BotRPG': 639072723859013632
// Servidor do canal escolhido: guild.id
// Servidor local: message.mentions._guild.id
// 0
// >
// 3
const Discord = require("discord.js");
const searchPrefix = require("../Functions/searchPrefix");
const CAnunciar = require("../models/ModelCAnunciar");
const User = require("../models/ModelUser");
exports.run = async (SMCodes, message, args) => {
    if(!args[0]) return message.reply("Digite uma novidade para ser anunciada.");
    var anuncio = args.join(" ");
    var canais = await CAnunciar.find();
    canais.map(canal => {
        var cc = SMCodes.channels.get(canal.channel_id);
        cc.send(anuncio);
    });
    message.reply("Foi anunciado com sucesso essa novidade, para todos os servidores que tem um canal novidades setado.");
};
exports.config ={
    name: 'anunciarn',
    status: true,
    help: 'Com esse comando você pode anunciar para todos os servidores que tem um canal setado com o comando ``active`` uma novidade.',
    emojicommand: '🔔',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 2
}