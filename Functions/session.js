const createTrash = require("./createTrash"),
createJob = require("./createJob");

async function sessionStart(message, infos) {
    if (message.content.toLowerCase() === "cancelar") {
        message.reply("**[Sessão] Sessão cancelada com sucesso!**");
    }
    switch (infos.type) {
        case 'create_trash':
            await createTrash(message, infos);
            break;
        case 'create_job':
            await createJob(messsage, infos);
            break;
    }
    return;
}

module.exports = sessionStart;