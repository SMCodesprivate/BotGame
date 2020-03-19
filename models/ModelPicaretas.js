const mongoose = require("mongoose");

const picaretas = new mongoose.Schema({
    name: String,
    emoji: String,
    emoji_id: Number,
    eficiencia: Number,
    valor: Number,
    dia: Number,
    mes: Number,
    ano: Number,
    durabilidade: Number
});

module.exports = mongoose.model('Picaretas', picaretas);