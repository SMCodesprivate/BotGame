const Discord = require("discord.js"),
Server = require("../models/ModelServer"),
func = require("../Functions/functions");
exports.run = async (SMCodes, message, args, author) => {
    var status = await func.verificationStaffer(author.user.id);
    if(!message.member.hasPermission("ADMINISTRATOR") && status === false) return message.reply("Você não tem permissão para executar esse comando.");
    var servidor = await Server.findOne({ server_id: message.mentions._guild.id });
    if(servidor === null) {
        servidor = await Server.create({
            server_id: message.mentions._guild.id,
            prefix: "^",
            block_link: true
        });
        message.channel.send("Agora os membros do servidor estão bloqueados de enviar links.");
        return;
    }
    switch(servidor.block_link) {
        case true:
            servidor = await Server.findOneAndUpdate({
                server_id: message.mentions._guild.id
            }, {
                block_link: false
            });
            message.channel.send("Agora os membros do servidor poderá enviar links.");
            break;
        case false:
            servidor = await Server.findOneAndUpdate({
                server_id: message.mentions._guild.id
            }, {
                block_link: true
            });
            message.channel.send("Agora os membros do servidor estão bloqueados de enviar links.");
            break;
        default:
            message.reply("Ouve algum erro reporte ao meu criador ``SMCodes#0032``");
            break;
    }
};
exports.config ={
    name: 'blockl',
    status: true,
    help: 'Esse comando você bloqueia mandar links nesse servidor ou desbloqueia.',
    emojicommand: '❌',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙',
    permission: 3
}