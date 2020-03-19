const mongoose = require("mongoose");

const channel = new mongoose.Schema({
    channel_id: String,
    channel_name: String,
    muted: Boolean,
    pquem: String
});

module.exports = mongoose.model('Channel', channel);