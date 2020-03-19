const mongoose = require("mongoose");

const mineracao = mongoose.Schema({
    user: String,
    id: Number,
    quantidade: Number
});

module.exports = new mongoose.model("Mineracao", mineracao);