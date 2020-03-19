const Discord = require("discord.js"),
fuc = require("../Functions/functions");
exports.run = async (SMCodes, message, args, author, prefix, server, user) => {
    var embed = new Discord.RichEmbed()
        .setTitle("**Escala de redução de ambiguidades monetários**")
        .setColor(fuc.getColor())
        .setDescription('**\n__Money »__** `$ '+fuc.calculate(user.money, 2)+'`\n**__Level »__** `'+user.level+'`\n**__Energia »__** `⚡ '+user.energia+'/'+user.limitenergia+'`**\n\n**')
        .addField("**Abreviatura »**", "```K```**\n**", true)
        .addField("**Extensão »**", "```1.000```**\n**", true)
        .addField("**Numero por escrito » **", "```MIL```**\n**", true)

        .addField("**Abreviatura »**", "```M```**\n**", true)
        .addField("**Extensão »**", "```1.000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```MILHÃO```**\n**", true)

        .addField("**Abreviatura »**", "```G```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```BILHÃO```**\n**", true)

        .addField("**Abreviatura »**", "```T```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000.0000```**\n**", true)
        .addField("**Numero por escrito » **", "```TRILHÃO```**\n**", true)

        .addField("**Abreviatura »**", "```P```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000.0000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```QUADRILHÃO```**\n**", true)

        .addField("**Abreviatura »**", "```E```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000.0000.000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```QUINTALHÃO```**\n**", true)

        .addField("**Abreviatura »**", "```Z```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000.0000.000.000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```SEXTILHÃO```**\n**", true)
        
        .addField("**Abreviatura »**", "```Y```**\n**", true)
        .addField("**Extensão »**", "```1.000.000.000.0000.000.000.000.000```**\n**", true)
        .addField("**Numero por escrito » **", "```SEPTILHÃO```**\n**", true)
        .addField("**\n\n** *Essa lista utiliza um sistema padrão de prefixo do `SI`, caso encontre algum erro ou queira saber mais sobre essa forma de padronização ambígua de prefixo numérico entre em contato com SMCodes#0032.*", "**\n**", false)
        .setTimestamp()
        .setFooter(author.user.tag, author.user.avatarURL);
    message.channel.send(embed);
};
exports.config ={
    name: 'escala',
    status: true,
    help: 'Esse comando você pode verificar o nosso sistema de abreviação de números de forma que entendível.',
    emojicommand: '📈',
    aliases: [],
    category: 'Outros',
    categoryemoji: '🚥'
}