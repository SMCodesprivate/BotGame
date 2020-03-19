const Discord = require("discord.js");
const Cargos = require("../models/ModelCargos");
const searchPrefix = require("../Functions/searchPrefix");
exports.run = async (SMCodes, message, args, author, prefix) =>{
    let autor = message.guild.members.get(message.author.id);
    if(!args[2]) return message.channel.send("Sintaxe incorreta utilize, ``"+prefix+"cargoadd {cargo_name} {cargo_level} {cargo_emoji}``");
    var verificar = await Cargos.findOne({ name: args[0] });
    if(verificar != null) return message.reply("Esse cargo já existe desculpe-me");
    verificar = await Cargos.findOne({ level: Number(args[1]) });
    if(verificar === null) {
        verificar = await Cargos.create({
            level: Number(args[1]),
            name: args[0],
            emoji: args[2],
            users: null
        });
        console.log(verificar);
        var createdEmbed = new Discord.RichEmbed()
            .setTitle(`**Cargo ${args[0]} foi criado**`)
            .addBlankField()
            .addField("**Nome do cargo » **", args[0], false)
            .addField("**Level do cargo » **", args[1], false)
            .addField("**Emoji do cargo » **", args[2], false)
            .addBlankField()
            .setTimestamp()
	        .setFooter(message.author.username, autor.user.avatarURL);
        message.channel.send(createdEmbed);
    } else {
        message.reply("Um cargo com esse level já está setado.");
        return;
    }

};
exports.config ={
    name: 'cargoadd',
    status: true,
    help: 'Esse comando você basicamente consegue adicionar um cargo.',
    emojicommand: '🥇',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 1
}