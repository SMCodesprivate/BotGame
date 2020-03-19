const prox = require("./continue"),
Lixo = require("../models/ModelLixo");

var trash_data = [];
async function createTrash(infos, message) {
    var z = -1;
    for (var x = 0; x <= trash_data.length - 1; x++) {
        if (trash_data[x].user_id === message.author.id) {
            z = x;
        }
    }
    console.log(z);
    switch (infos.level) {
        case 0:
            message.channel.send("**[Sessão]** Muito bem você digitou o nome do lixo agora por favor digite o valor do lixo »");
            trash_data.push({ user_id: message.author.id, name: message.content });
            prox.up(message.author.id);
            break;
        case 1:
            if (isNaN(message.content) === true) return message.reply("**[Sessão] Por favor digite um valor numérico para ser colocado como valor do lixo.**");
            trash_data[z].value = Number(message.content);
            message.channel.send("**[Sessão]** Tudo ocorreu bem até agora por favor digite valor de raridade de 1-10 »");
            prox.up(message.author.id);
            break;
        case 2:
            if (isNaN(message.content) === true) return message.reply("**[Sessão] Por favor digite um valor numérico para ser colocado como um valor de probabildade do lixo.**");
            await Lixo.create({
                name: trash_data[z].name,
                price: trash_data[z].value,
                rarity: Number(message.content)
            });
            message.channel.send("**[Sessão]** Okay, tudo ocorreu bem durante essa sessão então consequentemente o lixo foi criado agora você pode usa-lo.");
            prox.remove(message.author.id);
        default:
            prox.remove(message.author.id);
            break;
    }
}

module.exports = createTrash;