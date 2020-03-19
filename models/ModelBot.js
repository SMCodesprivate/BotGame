const mongoose = require("mongoose");

const bot = mongoose.Schema({
    id: String,
    version: Number,
    comandos: Number,
    categorias: Number,
    registered: Number
});

module.exports = new mongoose.model("Bot", bot);