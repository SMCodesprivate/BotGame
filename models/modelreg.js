const mongoose = require('mongoose');

const Reg = new mongoose.Schema({
	filename: String,
    comando: String,
    help: String,
    status: Boolean,
    category: String,
    emojicommand: String,
    emoji: String,
    aliases: Array
});

module.exports = mongoose.model('Reg', Reg);