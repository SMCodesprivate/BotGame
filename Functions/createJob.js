const prox = require("./continue"),
Job = require("../models/ModelJob");

var users_data = [];

async function createJob(infos, message) {
    var z = -1;
    for (var x = 0; x <= users_data.length - 1; x++) {
        if (users_data[x].user_id === message.author.id) {
            z = x;
        }
    }
    switch (infos.level) {
        case 0:
            if (isNaN(message.content) === true) return message.reply("**[Sessão]** Por favor digite um valor numérico para ser colocado no id");
            users_data.push({ user_id: message.author.id, id: message.content });
            message.channel.send("**[Sessão]** Tudo ocorreu bem agora digite um nome do emprego »");
            prox.up(message.author.id);
            break;
        case 1:
            var job = await Job.findOne({ name: message.content });
            if (job !== null) return message.reply("**[Sessão]** um emprego com esse nome já existe.");
            users_data[z].name = message.content.toLowerCase();
            message.channel.send("**[Sessão]** Tudo ocorreu bem agora digite uma descrição sobre o emprego »");
            prox.up(message.author.id);
            break;
        case 2:
            users_data[z].description = message.content;
            message.channel.send("**[Sessão]** Tudo ocorreu bem agora digite um valor para o sálario do emprego »");
            prox.up(message.author.id);
            break;
        case 3:
            if (isNaN(message.content) === true) return message.reply("**[Sessão]** Por favor digite um valor numérico para ser setado como salário.");
            users_data[z].salary = message.content;
            message.channel.send("**[Sessão]** Tudo ocorreu bem agora digite os comandos exclusivos do emprego (separado por `,`) »");
            prox.up(message.author.id);
            break;
        case 4:
            var msg = message.content.split(",");
            for (var loop = 0; loop <= msg.length - 1; loop++) {
                msg[loop] = msg[loop].trim();
            }
            users_data[z].unique = msg;
            message.channel.send("**[Sessão]** Tudo ocorreu bem agora digite o level necessário para conseguir trabalhar nesse emprego »");
            prox.up(message.author.id);
            break;
        case 5:
            if (isNaN(message.content) === true) return message.reply("**[Sessão]** Por favor digite um valor numérico para ser setado como level necessário.");
            users_data[z].level = message.content;
            var job = await Job.create({
                id: users_data[z].id,
                name: users_data[z].name.toLowerCase(),
                description: users_data[z].description,
                salary: users_data[z].salary,
                category: "Empregos",
                unique_commands: users_data[z].unique,
                level: message.content
            });
            message.channel.send("**[Sessão]** Parabéns você conseguiu completar 100% de uma Sessão com sucesso");
            prox.remove(message.author.id);
            break;
        default:
            prox.remove(message.author.id);
            break;
    }
}

module.exports = createJob;