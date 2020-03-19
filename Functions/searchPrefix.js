const mongoose = require('mongoose'),
Server = require('../models/ModelServer'),
config = require("../config.json");
async function searchPrefix(id) {
    let search = await Server.findOne({ server_id: id });
    if(search == null) {
        teste_prefixo = config.prefix;
    } else {
        var { prefix } = search;
        teste_prefixo = prefix;
    }
    return teste_prefixo;
}
module.exports = searchPrefix;