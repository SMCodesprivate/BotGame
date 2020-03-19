const mongoose = require('mongoose');

const canunciar = new mongoose.Schema({
	channel_id: String,
    server_id: String,
    user_id: String
});

module.exports = mongoose.model('CAnunciar', canunciar);