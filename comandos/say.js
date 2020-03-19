const Discord = require("discord.js");
const mongoose = require("mongoose");
const addServer = require('../Functions/addServer');
const addPicareta = require("../Functions/addPicareta");
const searchPrefix = require('../Functions/searchPrefix');
exports.run = async (SMCodes, message, args) =>{
    // message.delete();
    // // var infos = [
    // //     "Picareta de gesso",
    // //     "<:gesso:639925518619246637>",
    // //     "639925518619246637",
    // //     5,
    // //     5000
    // // ]
    // // addPicareta(infos);
    // searchPrefix(message.mentions._guild.id);
    // if(!args[0]) return message.reply("Sintaxe incorreta use ``"+teste_prefixo+"say {Mensagem}``");
    // let messag = args.join(" ");
    // // var deixa = args[1];
    // message.channel.send(messag);
};
exports.config ={
    name: 'say',
    status: true,
    help: 'Esse comando é para você falar em meu nome.',
    emojicommand: '📣',
    aliases: [],
    category: 'Outros',
    categoryemoji: '🚥',
    permission: 3
}
