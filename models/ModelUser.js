const mongoose = require('mongoose');

const Reg = new mongoose.Schema({
    user_id: Number,
    stats: String,
    mining: Boolean,
    level: Number,
    xp: Number,
    energia: Number,
    limitenergia: Number,
    money: Number,
    banido: Boolean,
    cargo: Number,
    picareta: Number,
    job: Number,
    date_job: Number,
    server_id: String,
    salary: Number,
    luck: Number,
    luck_xp: Number,
    luck_limiter: Number,
    warn: Boolean
});

module.exports = mongoose.model('User', Reg);