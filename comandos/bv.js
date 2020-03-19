const Discord = require("discord.js");
const Server = require("../models/ModelServer");
const searchPrefix = require("../Functions/searchPrefix");
exports.run = async (SMCodes, message, args) =>{
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não tem permissão para trocar a mensagem de entra desse servidor.");
    await searchPrefix(message.mentions._guild.id);
    if(!args[1]) return message.reply("Sintaxe incorreta use, ``"+teste_prefixo+"bv {#channel} {message}``");
    let teste = args[0].split("#");
    teste = teste[1].split(">");
    let asdfasd = SMCodes.channels.get(teste[0]);
    if(!asdfasd) return message.reply("Digite um canal válido desse servidor.");
    x = 1;
    let messageEnviate = "";
    while(x <= args.length-1) {
        messageEnviate = messageEnviate+args[x]+" ";
        x = x + 1;
    }
    // ^bv #asd Olá seja muito bem-vindo.
    // teste[0]
    // let messageEnviate = args[1].join(" ");
    // let canal = SMCodes.channels.get();
    var mudar = await Server.findOne({ server_id: message.mentions._guild.id });
    if(mudar != null) {
        // if(!mudar.prefix) 
        // console.log(mudar.prefix);
        mudar = await Server.findOneAndUpdate({
            server_id: message.mentions._guild.id
        }, {
            $set: {
                bem_vindo: messageEnviate,
                channel_bem_vindo: teste[0]
            }
        }, {
            new: true
        })
    } else {
        mudar = await Server.create({
            server_id: message.mentions._guild.id,
            prefix: "^",
            bem_vindo: messageEnviate,
            channel_bem_vindo: teste[0],
            block_link: null
        })
    }
    message.channel.send("A mensagem de Bem-Vindo foi trocada para \n```"+messageEnviate+"```\nObs: Esse sistema está em desenvolvimento.");
};
exports.config ={
    name: 'bv',
    status: true,
    help: 'Esse comando seta uma mensagem de bem-vindo para o servidor que está sendo executado esse comando (Em desenvolvimento).',
    emojicommand: '🚪',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙'
}