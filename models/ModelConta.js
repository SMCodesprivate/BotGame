const mongoose = require("mongoose");

const conta = mongoose.Schema({
    user_id: String,
    saques: Number,
    depositos: Number,
    money: Number,
    taxas: Number
});

module.exports = new mongoose.model("Conta", conta);