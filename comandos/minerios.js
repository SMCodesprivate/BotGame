const Discord = require("discord.js");
const User = require("../models/ModelUser");
const Mine = require("../models/ModelMinerios");
const addMinerio = require("../Functions/addMinerio");
const searchPrefix = require("../Functions/searchPrefix")
const searchMinerios = require("../Functions/searchMinerios");
exports.run = async (SMCodes, message, args) =>{
    await searchPrefix(message.mentions._guild.id)
    let autor = message.guild.members.get(message.author.id);
    if(!args[0]) {
        async function searchMinerios(avatarname, avatarurl) {
            var minerios = await Mine.find();
            if(minerios.length != 0) {
                let embedListMinerios = new Discord.RichEmbed()
                    .setColor("#555555")
                    .setTitle("Minérios disponíveis")
                    .addBlankField()
                    .setTimestamp()
                    .setFooter(avatarname, avatarurl);
                minerios.map(minerio => {
                    var { name, emoji, valor, durabilidade } = minerio;
                    embedListMinerios
                        .addField("Minerio » ", name, false)
                        .addField("Emoji » ", emoji, false)
                        .addField("Valor » ", valor, false)
                        .addField("Durabilidade » ", durabilidade, false)
                        .addBlankField()
                });
                message.channel.send(embedListMinerios);
            } else {
                let embedListMinerios = new Discord.RichEmbed()
                    .setColor("#555555")
                    .setTitle("Minérios disponíveis")
                    .setDescription("No momento estamos sem nenhum minério.")
                    .setTimestamp()
                    .setFooter(avatarname, avatarurl);
                message.channel.send(embedListMinerios);
            }
        }
        await searchMinerios(message.author.username, autor.user.avatarURL);
    }
    if(args[0]) {
        if(args[0] == "criar" || args[0] == "add") {
            // $minerios criar Pedra :pedra: 0.1666666667 2
            // $minerios criar Carvão :carvao: 0.4 10
            if(message.author.id != "360247173356584960") return message.reply("Você não é um de nossos administradores.");
                if(!args[4]) {
                    return message.reply("Sintaxe incorreta utilize, ``"+teste_prefixo+"minerios "+args[0]+" {name_minerio} {emoji} {valor} {durabilidade}``");
                } else {
                    var emoji_id = args[2].split(":");
                    emoji_id = emoji_id[2].split(">");
                    var infos = [args[1], args[2], emoji_id[0], args[3], args[4]];
                    addMinerio(infos)
                    let embedCreateMinerio = new Discord.RichEmbed()
                        .setTitle(args[2]+" Minério criado")
                        .addBlankField()
                        .addField("Minerio » ", args[1], false)
                        .addField("Emoji » ", args[2], false)
                        .addField("Emoji_id »", emoji_id[0], false)
                        .addField("Valor » ", args[3], false)
                        .addField("Durabilidade » ", args[4], false)
                        .setTimestamp()
                        .setFooter(message.author.username, autor.user.avatarURL);
                    message.channel.send(embedCreateMinerio)
                }
        }
    }
};
exports.config ={
    name: 'minerios',
    status: true,
    help: 'Esse comando possui subcomandos, mas ele sózinho mostra os minérios disponíveis.',
    emojicommand: '<:pedra:639859023407087626>',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}