const mongoose = require("mongoose");
const CAnunciar = require("../models/ModelCAnunciar");
async function addCAnunciar(channel_id, user_id, server_id, channel_reply) {
    var anuncios = await CAnunciar.findOne({ server_id });
    let result = "Não retornamos nada.";
    if(anuncios === null) {
        anuncios = await CAnunciar.create({
            channel_id,
            user_id,
            server_id
        });
        result = `O canal <#${channel_id}> foi setado como o canal para eu anunciar minhas novidades`;
    } else if(anuncios.channel_id === channel_id) {
        result = "Esse canal já está setado para ser anunciado minhas novidades.";
    } else {
        anuncios = await CAnunciar.findOneAndUpdate({
            server_id
        }, {
            user_id,
            channel_id
        })
        result = "O canal de anuncios sobre minhas novidades desse servidor foi trocado para <#"+channel_id+">.";
    }
    return channel_reply.send(result);
}

module.exports = addCAnunciar;