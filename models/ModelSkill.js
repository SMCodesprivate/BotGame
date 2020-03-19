const mongoose = require("mongoose");

const skills = new mongoose.Schema({
    user_id: Number,
    forcalevel: Number,
    minelevel: Number,
    qilevel: Number,
    speedlevel: Number,
    staminalevel: Number
});

module.exports = mongoose.model('Skill', skills);