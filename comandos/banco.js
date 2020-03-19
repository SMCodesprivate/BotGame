const Discord = require("discord.js"),
Conta = require("../models/ModelConta"),
Banco = require("../models/ModelBanco"),
fuc = require("../Functions/functions"),
Money = require("./money.js"),
User = require("../models/ModelUser");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    if(!args[0]) {
        var bank = await Banco.findOne({ server_id: server.id });
        if(bank === null) {
            bank = await fuc.createBank(server.id);
        }
        // console.log(server);
        var embed = new Discord.RichEmbed()
            .setColor("#"+fuc.getColor())
            .setTitle("**Banco do servidor __"+server.name+"__ **")
            .setThumbnail(author.user.avatarURL)
            .setDescription('**__Seu money »__** `$ '+user.money+'`\n**__Seu level »__** `'+user.level+'`\n**__Sua energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`')
            .addBlankField()
            .addField("**ID »**", "```"+bank.server_id+"```", false)
            .addField("**Imposto »**", "```"+bank.imposto+"```", true)
            .addField("**Taxas recolhidas »**", "```"+bank.taxas+"```", true)
            .addField("**Cofre »**", "```"+bank.money+"```", false)
            .addField("**Depósitos »**", "```"+bank.depositos+"```", true)
            .addField("**Saques »**", "```"+bank.saques+"```", true)
            .addField("**Funcionários »**", "```"+bank.funcionarios.length+"```", false)
            .addField("**Cartões de crédito »**", "```"+bank.cartoes.length+"```", false)
            .addBlankField()
            .setTimestamp()
            .setFooter(author.user.tag+" - "+author.user.id, author.user.avatarURL);
        message.channel.send(embed);
        return;
    }
    var conta = await Conta.findOne({ user_id: author.user.id });
    switch(args[0]) {
        case 'depositar':
            if(conta === null) return message.reply("**você não tem um conta no banco caso queira usar alguma função do banco utilize » `"+prefix+"banco conta criar`**");
            if(!args[1] || !Number(args[1])) return message.reply("**por favor digite um valor para ser depositado.**");
            var infos = await fuc.deposit(author.user.id, message.mentions._guild.id, args[1], message);
            var bank = await Banco.findOne({ server_id: message.mentions._guild.id });
            if(infos.error !== null) return message.reply(infos.error);
            var dep = await fuc.transformAcc(infos.conta, author);
            message.channel.send(dep);
            message.channel.send("***Foi retido "+bank.imposto+"% pelos impostos do banco.***");
            break;
        case 'sacar':
            if(conta === null) return message.reply("**você não tem um conta no banco caso queira usar alguma função do banco utilize » `"+prefix+"banco conta criar`**");
            if(!args[1] || !Number(args[1])) return message.reply("**por favor digite um valor para ser sacado.**");
            var infos = await fuc.withdraw(author.user.id, message.mentions._guild.id, Number(args[1]), message);
            var bank = await Banco.findOne({ server_id: message.mentions._guild.id });
            if(infos.error !== null) return message.reply(infos.error);
            var dep = await fuc.transformAcc(infos.conta, author);
            message.channel.send(dep);
            message.channel.send("***Foi sacado "+args[1]+" com sucesso.***");
            var nada = [];
            await Money.run(SMCodes, message, nada);
            break;
        case 'conta':
            switch(args[1]) {
                case 'criar':
                    conta = await fuc.createAccount(author.user.id);
                    var embedCreate = new Discord.RichEmbed()
                        .setColor("#"+fuc.getColor())
                        .setTitle("**Criação de conta em nosso banco**")
                        .setThumbnail(author.user.avatarURL)
                        .addBlankField()
                        .addField("**Seu id »**", "**`"+conta.user_id+"`**")
                        .addField("**Saques »**", "**`"+conta.saques+"`**")
                        .addField("**Depósitos »**", "**`"+conta.depositos+"`**")
                        .addField("**Money »**", "**`"+conta.money+"`**")
                        .addField("**Taxas recolhidas »**", "**`"+conta.taxas+"`**")
                        .addBlankField()
                        .setTimestamp()
                        .setFooter(author.user.tag, author.user.avatarURL);
                    message.channel.send(embedCreate);
                    break;
            }
            if(conta === null) return message.reply("**você não tem um conta no banco caso queira usar alguma função do banco utilize » `"+prefix+"banco conta criar`**");
            var embed = fuc.transformAcc(conta, author);
            message.channel.send(embed);
        break;
        default:
            message.channel.send("Esse sub-comando não existe, caso for um erro reporte para `SMCodes#0032`");
            break;
    }
};
exports.config ={
    name: 'banco',
    status: true,
    help: 'Esse comando proporciona experiências de nosso sistema de banco.',
    emojicommand: '💰',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
};