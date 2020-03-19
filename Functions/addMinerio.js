const Mine = require("../models/ModelMinerios");
const mongoose = require("mongoose");
async function addMinerio(infos) {
    var registrar = await Mine.findOne({ name: infos[0] });
    if(registrar == null || !registrar) {
        registrar = await Mine.create({
            name: infos[0],
            emoji: infos[1],
            emoji_id: infos[2],
            valor: infos[3],
            durabilidade: infos[4]
        });
    }
}

module.exports = addMinerio;