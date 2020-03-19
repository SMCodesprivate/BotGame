const mongoose = require('mongoose');

const servers = new mongoose.Schema({
	server_id: String,
    prefix: String,
    bem_vindo: String,
    bye_bye: String,
    channel_bem_vindo: String,
    channel_bye_bye: String,
    block_link: Boolean
});

module.exports = mongoose.model('Server', servers);