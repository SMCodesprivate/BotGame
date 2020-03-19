const mongoose = require('mongoose');

const Reg = new mongoose.Schema({
	categoria: String,
    emoji: String,
    quantidade: Number,
    comandos: String
});

module.exports = mongoose.model('Categoria', Reg);