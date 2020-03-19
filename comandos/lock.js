const Discord = require("discord.js"),
Channel = require("../models/ModelChannel"),
functions = require("../Functions/functions"),
User = require("../models/ModelUser"),
Cargos = require("../models/ModelCargos"),
setar = require("../Functions/setar");
exports.run = async (SMCodes, message, args, author) => {
    var canal = await Channel.findOne({ channel_id: message.channel.id });
    if(canal == null) {
        setar(message.channel.id, message.author.id, null, message);
        return;
    }
    return (canal.muted) ? setar(message.channel.id, message.author.id, false, message) : setar(message.channel.id, message.author.id, true, message);
};
exports.config ={
    name: 'lock',
    status: true,
    help: 'Esse comando você bloqueia o canal que você está e nenhum usuário além de administrador poderá enviar mensagens.',
    emojicommand: '🚫',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 3
}