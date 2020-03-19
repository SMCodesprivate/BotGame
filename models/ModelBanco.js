const mongoose = require("mongoose");

const banco = mongoose.Schema({
    server_id: String,
    imposto: Number,
    taxas: Number,
    money: Number,
    depositos: Number,
    saques: Number,
    funcionarios: Array,
    cartoes: Array
});

module.exports = new mongoose.model("Banco", banco);