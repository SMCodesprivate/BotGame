const Discord = require("discord.js"),
addServer = require("../Functions/addServer"),
searchPrefix = require("../Functions/searchPrefix"),
Categoria = require("../models/modelcategorias"),
Bot = require("../models/ModelBot"),
User = require("../models/ModelUser"),
functions = require("../Functions/functions");
async function construct(infos, author, bot) {
    var version = infos.version.toString().split("");
    var version_new = "";
    for(var x = 0;x <= version.length-1;x++) {
        if(x === 0) {
            version_new += version[x];
        } else {
            version_new += "."+version[x];
        }
    }
    var embed = new Discord.RichEmbed()
        .setColor("#"+functions.getColor())
        .setTitle("**Atualização**")
        .setThumbnail(author.user.avatarURl)
        .setDescription("**Atualização do bot "+bot.user.tag+"**")
        .addBlankField()
        .addField("**Bot id »**", "`"+infos.id+"`")
        .addField("**Version »**", "`"+version_new+"`")
        .addField("**Comandos »**", "`"+infos.comandos+"`")
        .addField("**Categorias »**", "`"+infos.categorias+"`")
        .addField("**Usuários registrados »**", "`"+infos.registered+"`")
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.tag, author.user.avatarURL);
    return embed;
}
exports.run = async (SMCodes, message, args, author) => {
    var bot = await Bot.findOne({ id: SMCodes.user.id });
    var update = await functions.upBot(1, SMCodes.user.id);
    var embed = await construct(update, author, SMCodes);
    message.channel.send(embed);
};
exports.config ={
    name: 'update',
    status: true,
    help: 'Esse comando meu criador pode atualizar minha versão adicionando novos comandos.',
    emojicommand: '♾️',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 0
}