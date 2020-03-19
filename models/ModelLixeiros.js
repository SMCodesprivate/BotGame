const mongoose = require('mongoose');

const lixeiros = new mongoose.Schema({
    id: String,
    quantidade: Number,
    bonus: Number,
    type: String
});

module.exports = mongoose.model("Lixeiro", lixeiros);