const Discord = require("discord.js");
const User = require("../models/ModelUser");
const searchPrefix = require('../Functions/searchPrefix');
const batalharUser = require("../Functions/batalharUser");
const createRichEmbed = require("../Functions/createRichEmbed");
exports.run = async (SMCodes, message, args) =>{
    if(!args[0]) return message.reply("Por favor mencione um membro desse servidor.");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.reply("Por favor mencione um membro válido deste servidor");
    let author = message.guild.members.get(message.author.id);
    if(!author) return message.reply("Por favor mencione um membro válido deste servidor");
    await batalharUser(author, member, message.mentions._guild.id)
    if(embed != false) {
        var { title, color, field, images } = embed;
        var { quantidade } = field;
        var { fields } = field;
        var created = await createRichEmbed(title, color, quantidade, fields, images);
        message.channel.send(created)
    }
    if(enviar == true) {
        message.channel.send(messageInvite);
    }
};
exports.config ={
    name: 'batalhar',
    status: true,
    help: 'Esse comando você batalha contra outra pessoa.',
    emojicommand: '🗡',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}