const Discord = require("discord.js"),
User = require("../models/ModelUser"),
Cargos = require("../models/ModelCargos"),
functions = require("../Functions/functions");
exports.run = async (SMCodes, message, args, author) =>{
    var staffersEmbed = new Discord.RichEmbed()
        .setColor("#"+functions.getColor())
        .setThumbnail(author.user.avatarURL)
        .setTitle("**Staffers**")
        .addBlankField()
        .setTimestamp()
        .setFooter(author.user.tag, author.user.avatarURL);
    var cargos = await Cargos.find();
    for(var x = 0;x <= cargos.length-1;x++) {
        var cargo = cargos[x];
        var cargoCount = await User.find({ cargo: cargo.level });
        staffersEmbed.addField(cargo.emoji+" "+cargo.name, `(${cargoCount.length})`, false);
    }
    message.channel.send(staffersEmbed.addBlankField());
};
exports.config ={
    name: 'stafflist',
    status: true,
    help: 'Com esse comando você vê a lista de staffers do bot.',
    emojicommand: '📖',
    aliases: [],
    category: 'Configurações',
    categoryemoji: '⚙'
}