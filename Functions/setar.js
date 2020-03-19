const Channel = require("../models/ModelChannel"),
functions = require("../Functions/functions"),
User = require("../models/ModelUser"),
Cargos = require("../models/ModelCargos");

async function setar(id, user_id, muted, message) {
    if(muted === null) {
    }
    switch(muted) {
        case null:
            var canal = await Channel.create({
                channel_id: id,
                muted: true,
                pquem: user_id
            });
            break;
        default:
            var mudar = await Channel.findOneAndUpdate({
                channel_id: id
            }, {
                muted,
                pquem: user_id
            });
            break;
    }
    if(muted === false) return message.channel.send("Você desbloqueou esse canal agora todo mundo conseguirá enviar mensagem.");
    if(muted === null || muted === true) return message.channel.send("Você bloqueou esse canal apenas administradores conseguirá enviar mensagem.");

}
module.exports = setar;