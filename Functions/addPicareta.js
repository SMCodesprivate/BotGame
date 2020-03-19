const Picaretas = require("../models/ModelPicaretas");
const mongoose = require("mongoose");

async function addPicareta(infos) {
    let criar = await Picaretas.findOne({ name: infos[0] });
    var asd_asd = true;
    if(criar == null) {
        criar = await Picaretas.create({
            name: infos[0],
            emoji: infos[1],
            emoji_id: infos[2],
            eficiencia: infos[3],
            valor: infos[4],
            dia: infos[5],
            mes: infos[6],
            ano: infos[7]
        })
    }
    return asd_asd;
}
module.exports = addPicareta;