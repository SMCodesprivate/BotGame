const Discord = require("discord.js"),
User = require("../models/ModelUser"),
functions = require("../Functions/functions"),
Mineracao = require("../models/ModelMineracao"),
Minerios = require("../models/ModelMinerios"),
addMoney = require('../Functions/addMoney');
exports.run = async (SMCodes, message, args, author) =>{
    var user = await User.findOne({ user_id: author.user.id }),
    m = await Mineracao.find({ user: author.user.id }),
    minerios = await Minerios.find(),
    valor = 0;
    var test = true;
    var embedMinerios = new Discord.RichEmbed()
        .setColor("#"+functions.getColor())
        .setThumbnail(author.user.avatarURL)
        .setTitle("**💱 Venda de minérios**")
        .setDescription('**__Money »__** `$ '+user.money+'`\n**__Level »__** `'+user.level+'`\n**__Energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`')
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.tag, author.user.avatarURL);
    for(var z = 0;z <= minerios.length-1;z++) {
        var minerio = minerios[z];
        var x = await Mineracao.findOne({ id: minerio.id, user: message.author.id });
        if(x === null) {
            x = await Mineracao.create({
                user: message.author.id,
                id: minerio.id,
                quantidade: 0
            });
        }
        if(x.quantidade <= 0) {
            test = false;
        } else {
            teste = true;
        }
        valor += Math.floor(x.quantidade*minerio.valor);
        embedMinerios.addField("**"+minerio.name+" » **", "```"+x.quantidade+"```", true);
    }
    if(test === false) {
        var error = new Discord.RichEmbed()
            .setColor("#"+functions.getColor())
            .setThumbnail(author.user.avatarURL)
            .setTitle("**💱 Venda de minérios**")
            .setDescription('**__Money »__** `$ '+user.money+'`\n**__Level »__** `'+user.level+'`\n**__Energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`')
            .addBlankField()
            .addField("**Error » **", "**Você não tem nenhum minério para ser vendido**")
            .addBlankField()
            .setTimestamp()
            .setFooter(author.user.tag, author.user.avatarURL);
        message.channel.send(error);
        return;
    }
    var total = valor+user.money;
    embedMinerios.addBlankField()
    .addField("**Valor da venda » **", "`"+valor+"`")
    .addField("**Total » **", "`"+total+"`");
    message.channel.send(embedMinerios.addBlankField()).then(async msg => {
        await msg.react("✔️");
        let filtro = (reaction, user) => user.id === message.author.id;
        const collector = msg.createReactionCollector(filtro, {max: 2, time: 20000});
        collector.on("collect", async r => {
            if(r.emoji.name === '✔️') {
                addMoney(valor, author.user.id);
                for(var y = 0;y <= minerios.length-1;y++) {
                    await Mineracao.findOneAndDelete({
                        user: message.author.id
                    });
                }
                var embedNew = new Discord.RichEmbed()
                    .setColor("#"+functions.getColor())
                    .setTitle("**Vendas**")
                    .setThumbnail(author.user.avatarURL)
                    .addBlankField()
                    .addField("**Você vendeu seus minérios por » **", valor)
                    .addField("**Seu money atual »**", total)
                    .addBlankField()
                    .setTimestamp()
                    .setFooter(author.user.tag, author.user.avatarURL);
                msg.channel.send(embedNew);
            }
        })
    });
};
exports.config ={
    name: 'vender',
    status: true,
    help: 'Esse comando você poderá usa-lo para vender os minérios e ganhar dinheiro.',
    emojicommand: '💱',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}