const mongoose = require("mongoose");

const cargos = new mongoose.Schema({
    level: Number,
    emoji: String,
    name: String,
    users: Array
});

module.exports = mongoose.model("Cargos", cargos);