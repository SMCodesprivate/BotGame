const mongoose = require("mongoose");

const lixo = new mongoose.Schema({
    name: String,
    price: Number,
    rarity: Number
});


module.exports = mongoose.model("Lixo", lixo);