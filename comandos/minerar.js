const Discord = require("discord.js"),
Picaretas =  require("../models/ModelPicaretas"),
User = require("../models/ModelUser"),
functions = require("../Functions/functions"),
Mineracao = require("../models/ModelMineracao"),
Minerios = require("../models/ModelMinerios");
exports.run = async (SMCodes, message, args, author) =>{
    function generateEmbed() {
        var embedMine = new Discord.RichEmbed()
            .setColor("#"+functions.getColor())
            .setTitle("**`"+author.user.tag+"` minerando...**")
            .setThumbnail(author.user.avatarURL)
            .setDescription('**__Money »__** `$ '+user.money+'`\n**__Level »__** `✴️ '+user.level+'`\n**__Energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`\n**__Picareta »__** `⛏️ '+pic.name+'`')
            .addBlankField()
            .setTimestamp()
            .setFooter(author.user.tag, author.user.avatarURL);
        return embedMine;
    }
    var user = await User.findOne({ user_id: author.user.id }),
    pic = await Picaretas.find();
    pic = pic[user.picareta],
    minerios = await Minerios.find();
    if(!user) return message.reply("Sua conta não está registrada em nosso sistema.");
    if(user.mining === true) return message.reply("Você já está minerando.");
    var embed = generateEmbed();
    for(var z = 0;z <= minerios.length-1;z++) {
        var minerio = minerios[z];
        var x = await Mineracao.findOne({ id: minerio.id, user: message.author.id });
        if(x === null) {
            var a = await Mineracao.create({
                user: message.author.id,
                id: minerio.id,
                quantidade: 0
            });
            embed.addField("**"+minerio.name+" » **", "```"+a.quantidade+"```", true);
        } else {
            embed.addField("**"+minerio.name+" » **", "```"+x.quantidade+"```", true);
        }
    }
    message.channel.send(embed.addBlankField()).then(async msg => {
        var enrg = user.energia;
        if(enrg <= 5) {
            msg.channel.send("Você não tem a energia minima de iniciar uma mineração.");
            return;
        }
        await User.findOneAndUpdate({
            user_id: message.author.id
        }, {
            mining: true
        });
        for(var count = 0;count < enrg;++count) {
            (async function (count) {
                setTimeout(async function () {
                    user = await User.findOne({ user_id: author.user.id });
                    await User.findOneAndUpdate({ user_id: author.user.id }, { energia: user.energia - 1 });
                    var embedM = generateEmbed();
                    for(var o = 0;o <= minerios.length-1;o++) {
                        var adicionation = Math.floor(Math.random() * pic.eficiencia / minerios[o].durabilidade);
                        var minerio = minerios[o];
                        var i = await Mineracao.findOne({ id: minerio.id, user: message.author.id });
                        if(i === null) {
                            i = await Mineracao.create({
                                user: message.author.id,
                                id: minerio.id,
                                quantidade: 0
                            });
                        }
                        await Mineracao.findOneAndUpdate({
                            id: minerio.id,
                            user: message.author.id
                        }, {
                            quantidade: i.quantidade + adicionation
                        })
                        embedM.addField("**"+minerio.name+" » **", "```"+i.quantidade+" +"+adicionation+"```", true);
                    }
                    msg.edit(embedM.addBlankField());
                }, 2500*count);
            })(count);
        }
        setTimeout(async () => {
            // msg.delete().catch(O_o=>{});
            await User.findOneAndUpdate({
                user_id: message.author.id
            }, {
                mining: false
            });

            var timespan = user.limitenergia*10000; 
            var time = functions.msToHMS(timespan);
            msg.channel.send("Sua energia acabou espere "+time);
        }, 2500*enrg);
    });
};
exports.config ={
    name: 'minerar',
    status: true,
    help: 'Esse comando você poderá usa-lo para ganhar dinheiro dentro de nosso sistema.',
    emojicommand: '⛏️',
    aliases: ['m'],
    category: 'RPG',
    categoryemoji: '⚒'
}