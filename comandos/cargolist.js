const Discord = require("discord.js");
const Cargos = require("../models/ModelCargos");
exports.run = async (SMCodes, message, args) =>{
    var user = message.guild.members.get(message.author.id);
    var list = await Cargos.find();
    if(list === null || list.length == 0) {
        var embedList = new Discord.RichEmbed()
            .setTitle("**Lista de cargos**")
            .addBlankField()
            .addField("Não temos nenhum cargo registrado, eu acho que ocorrer algum erro", "Por favor reporte para o meu criador SMCodes#0032", false)
            .addBlankField()
            .setTimestamp()
            .setFooter(user.user.username, user.user.avatarURL);
        message.channel.send(embedList);
        return;
    }
    var embedList = new Discord.RichEmbed()
        .setTitle("**📃 Lista de cargos**")
        .addBlankField()
        .setColor("#333333")
        .setTimestamp()
        .setFooter(user.user.username, user.user.avatarURL);
    list.map(cargo => {
        embedList.addField("**Nome do cargo » **", cargo.name, false).addField("**Level do cargo » **", cargo.level, false).addField("**Emoji do cargo » **", cargo.emoji, false).addBlankField();;
    });
    message.channel.send(embedList);
};
exports.config ={
    name: 'cargolist',
    status: true,
    help: 'Esse comando mostra a lista sobre cada level de cargo disponíveis em minhas funcionalidades.',
    emojicommand: '📃',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙'
}