const Discord = require("discord.js");
exports.run = async (SMCodes, message, args) =>{
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let autor = message.guild.members.get(message.author.id);
        const deleteCount = parseInt(args[0], 10);
        if(deleteCount > 100) {
            var x = deleteCount / 100;
            let embedLimpar = new Discord.RichEmbed()
                .setTitle("Limpar "+args[0])
                .setDescription(`Você executou o comando para limpar mais que 100 mensagens isso pode lagar.\nTem certeza?`)
                .addBlankField()
                .addField("Clique em ✔ caso queira apagar "+args[0]+".", "Clique em ✖ caso queira cancelar.", false)
            message.channel.send(embedLimpar).then(async msg => {
                await msg.react("✔")
                await msg.react("✖")
                let filtro = (reaction) => (reaction.emoji.name === '✔', '✖');
                const collector = msg.createReactionCollector(filtro, {min: 2, time: 60000, max: 2});
                collector.on("collect", async r => {
                    collector.on("collect", async r => {
                        switch(r.emoji.name) {
                            case '✔':
                                while(x >= 0) {
                                    await message.channel.bulkDelete(100)
                                        .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
                                    console.log(x);
                                    x = x - 1;
                                }
                                let embedEnviar = new Discord.RichEmbed()
                                    .setTitle("Limpeza")
                                    .addBlankField()
                                    .addField("Foi limpado » ", args[0], false)
                                    .addField("Author » ", message.author.username, false)
                                    .setTimestamp()
                                    .setFooter(message.author.username+message.author.tag, autor.user.avatarURL);
                                message.channel.send(embedEnviar);
                                break;
                            case '✖':
                                msg.delete().catch(O_o=>{});
                                break;
                        }
                    })
                })
            })
            // while(x != 1) {
            //     message.channel.bulkDelete(100)
            //         .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
            //     console.log(x);
            //     x = x - 1;
            // }
            // message.channel.send(`O usuário ${message.author} apagou ${args[0]} mensagens`);
            console.log(x);
        } else {
            const fetched = await message.channel.fetchMessages({limit: deleteCount});
            message.channel.send(`O usuário ${message.author} apagou ${args[0]} mensagens`);
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
        }
    }

};
exports.config ={
    name: 'limpar',
    status: true,
    help: 'Esse comando limpa a quantidade de mensagens específicas.',
    emojicommand: '💬',
    aliases: ['clear'],
    category: 'Outros',
    categoryemoji: '🚥'
}