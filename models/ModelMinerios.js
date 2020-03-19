const mongoose = require("mongoose");

const minerios = new mongoose.Schema({
    name: String,
    emoji: String,
    emoji_id: Number,
    valor: Number,
    durabilidade: Number,
    id: Number,
});

module.exports = mongoose.model('Mine', minerios)