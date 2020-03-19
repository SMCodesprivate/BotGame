const Discord = require("discord.js"),
User = require("../models/ModelUser"),
fuc = require("../Functions/functions"),
Lixo = require("../models/ModelLixo"),
Lixeiro = require("../models/ModelLixeiros"),
msToHms = require('ms-to-hms'),
Job = require('../models/ModelJob'),
Money = require("../comandos/money");
exports.run = async (SMCodes, message, args, author, prefix, server, user) => {
    if(user.job !== 0 || user.job === undefined || user.job === -1) {
        return message.channel.send(author+"\n**["+this.config.name.toUpperCase()+"]** Você não tem o emprego **"+this.config.name.toUpperCase()+"** então não poderá usar os comandos de tal, você pode pegar o emprego utilizando `"+prefix+"trabalhar {lixeiro/0}`.");
    } else {
        return message.channel.send(author+"\n**["+this.config.name.toUpperCase()+"]** Digite `"+prefix+this.config.name+" comandos` para saber os comandos da profissão lixeiro.");
    }
    var job = await Job.findOne({ id: user.job });
    switch(args[0]) {
        case 'coletar':
            if(user.mining === true) return message.channel.send("**["+job.name.toUpperCase()+"]** Você já está utilizando sua energia.");
            if(user.energia <= 5) return message.channel.send("**["+job.name.toUpperCase()+"]** Você não tem energia suficiente para começar uma mineração.");
            var b = Number(user.energia * 5000);
            b = msToHms(b);
            var embed = new Discord.RichEmbed()
                .setColor(fuc.getColor())
                .setTitle("**Coleta de lixo de "+author.user.username+"**")
                .setDescription('**\n__Money »__** `$ '+user.money+'`\n**__Level »__** `✴️ '+user.level+'`\n**__Energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`\n**__Sorte level »__** `🎲 '+user.luck+'`\n**__Sorte xp »__** `🎲 '+user.luck_xp+'/'+user.luck_limiter+'`\n**__Tempo por energia »__** `5s`\n**__Tempo coletando lixo »__** `'+b+'`')
                .addBlankField()
                .setTimestamp()
                .setFooter(author.user.tag, author.user.avatarURL);
            var lixos = await Lixo.find();
            for(var o = 0;o <= lixos.length-1;o++) {
                var l = lixos[o];
                var lixeiro = await Lixeiro.findOne({ id: author.user.id, type: l.name });
                if(lixeiro === null) {
                    lixeiro = await Lixeiro.create({
                        id: author.user.id,
                        quantidade: 0,
                        bonus: 0,
                        type: l.name
                    });
                }
                embed.addField("**__"+l.name+" »__**", "```"+lixeiro.quantidade+"```", true);
            }
            message.channel.send(embed.addBlankField()).then(msg => {
                var limiter = user.energia+1;
                setTimeout(async () => {
                    msg.delete().catch(O_o=>{});
                    message.channel.send("**[Lixeiro]** Seu coleta de lixo foi cancelada por que sua energia acabou espere a até que ela recarrege-se.");
                    await User.findOneAndUpdate({
                        user_id: message.author.id
                    }, {
                        mining: false,
                        energia: 0
                    });
                }, (limiter+1) * 5000);
                for(var i = 0;i <= limiter;i++) {
                    (function(index) {
                        setTimeout(async function() {
                            var user_msg = await User.findOne({ user_id: author.user.id });
                            var oasdf = Math.floor(Math.random() * (user_msg.luck+23));
                            user_msg = await fuc.upXpLuck(message.author.id, oasdf);
                            await User.findOneAndUpdate({
                                user_id: author.user.id
                            }, {
                                energia: user_msg.energia-1,
                                mining: true
                            });
                            user_msg = await User.findOne({ user_id: author.user.id });
                            var a = Number(user_msg.energia * 5000),
                            a = msToHms(a);
                            desc = '**\n__Money »__** `$ '+user_msg.money+'`\n**__Level »__** `✴️ '+user_msg.level+'`\n**__Energia »__** `⚡ '+user_msg.energia+'/'+user_msg.limitenergia+'`\n**__Sorte level »__** `🎲 '+user_msg.luck+'`\n**__Sorte xp »__** `🎲 '+user_msg.luck_xp+'/'+user_msg.luck_limiter+' +'+oasdf+'`\n**__Tempo por energia »__** `5s`\n**__Tempo coletando lixo »__** `'+a+'`';
                            var embedMsg = new Discord.RichEmbed()
                                .setColor("#"+fuc.getColor())
                                .setTitle("**Coleta de lixo de "+author.user.username+"**")
                                .setDescription(desc)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(author.user.tag, author.user.avatarURL);
                            for(var p_lixo = 0;p_lixo <= lixos.length-1;p_lixo++) {
                                var l = lixos[p_lixo],
                                a = user_msg.luck+5 / l.rarity,
                                lixeiro = await Lixeiro.findOne({ id: author.user.id, type: l.name });
                                get = Math.floor(Math.random() * a);
                                await Lixeiro.findOneAndUpdate({ id: author.user.id, type: l.name }, {
                                    quantidade: lixeiro.quantidade + get
                                });
                                lixeiro = await Lixeiro.findOne({ id: author.user.id, type: l.name });
                                embedMsg.addField("**__"+l.name+" »__**", "```"+lixeiro.quantidade+" +"+get+"```", true);
                            }
                            msg.edit(embedMsg.addBlankField()).catch(O_o=>{});
                        }, i * 5000);
                    })(i);
                }
            });
            break;
        case 'vender':
            var embedSell = new Discord.RichEmbed()
                .setColor("#"+fuc.getColor())
                .setTitle("**Venda de lixos**")
                .addBlankField()
                .setTimestamp()
                .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL),
            value = 0,
            lixos = await Lixeiro.find({ id: message.author.id }),
            teste = new Discord.RichEmbed()
                .setColor("#"+fuc.getColor())
                .setTitle("**Venda de lixos**")
                .addBlankField()
                .setTimestamp()
                .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL);
            for(var lixo_count = 0;lixo_count <= lixos.length-1;lixo_count++) {
                var lx = await Lixo.findOne({ name: lixos[lixo_count].type });
                var price = lx.price * lixos[lixo_count].quantidade;
                value += price;
                embedSell.addField("**__"+lixos[lixo_count].type+" »__**", "```"+lixos[lixo_count].quantidade+" \n\n$ "+price+"```", true);
                teste.addField("**__"+lixos[lixo_count].type+" »__**", "```0 \n\n$ 0```", true);
            }
            embedSell.addField("**\n\n\nCodição total do valor monetário lucrado coletando lixo »**", "**$ "+fuc.calculate(value, 2)+"**");
            message.channel.send(embedSell.addBlankField()).then(async msg => {
                await msg.react(`✅`);
                let filtro = (reaction, user) => (reaction.emoji.name === '✅')  && user.id === message.author.id;
                const collector = msg.createReactionCollector(filtro, {max: 1, time: 20000});
                collector.on("collect", async r => {
                    switch(r.emoji.name) {
                        case '✅':
                            await User.findOneAndUpdate({
                                user_id: message.author.id
                            }, {
                                money: user.money + value
                            });
                            lixos_user = await Lixeiro.find({ id: message.author.id });
                            lixos_user.map(async lx_u => {
                                await Lixeiro.findOneAndUpdate({
                                    _id: lx_u._id
                                }, {
                                    quantidade: 0
                                });
                            });
                            teste.addField("**\n\n\nVocê vendeu seus lixos com sucesso agora pode coletar novos lixos ou trocar de profissão, você vendeu por »**", "**$ "+fuc.calculate(value, 2)+"**");
                            msg.edit(teste.addBlankField());
                            setTimeout(async () => {
                                await Money.run(SMCodes, message, [], author, prefix, server, user);
                            }, 2000);
                            break;
                    }
                });
            });
            break;
        case 'demissao':
            await User.findOneAndUpdate({
                user_id: author.user.id
            }, {
                job: -1,
                salary: -1
            });
            message.channel.send("**["+job.name.toUpperCase()+"]** Você pediu demissão ENTÃO VOCÊ ESTÁ DESPEDIDO, caso queira voltar a trabalhar aqui digite `"+prefix+"trabalhar {"+job.name+"/"+job.id+"}`");
            break;
        case 'comandos':
            var embed = new Discord.RichEmbed()
                .setColor("#"+fuc.getColor())
                .setTitle("**Esses são os comandos disponíveis para `"+job.name.toUpperCase()+"`**")
                .addBlankField()
                .addField("**1°- `"+prefix+this.config.name+" coletar`**", "Com esse sub-comando você pode usar para inicializar uma coleta de lixo, porém ela dura até sua energia acabar, a cada 5 segundos consome 1 de energia, ou seja quanto mais level de ***stamina*** mais tempo durará sua coleta de lixo, consequentemente você ganhará mais ***money***.**\n\n**")
                .addField("**2°- `"+prefix+this.config.name+" vender`**", "Esse sub-comando serve para os lixeiros poder vender os seus lixos, alguns sendo valiosos e outros sendo desvalorizados, para saber o valor de cada lixo digite » `"+prefix+"lixos`.**\n\n**")
                .addField("**3°- `"+prefix+this.config.name+" demissao`**", "A funcionalidade desse comando é para um trabalhador que tenha o emprego *****"+this.config.name.toLowerCase()+"***** pedir demissão.**\n\n**")
                .addBlankField()
                .setTimestamp()
                .setFooter(author.user.username+" - "+author.user.id, author.user.avatarURL);
            message.channel.send(embed);
            break;
    }

};
exports.config ={
    name: 'lixeiro',
    status: true,
    help: 'Esse comando gerencia as funções do emprego **LIXEIRO**.',
    emojicommand: '🗑️',
    aliases: [],
    category: 'Empregos',
    categoryemoji: '🧰'
};