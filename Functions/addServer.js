const mongoose = require('mongoose');
const Server = require('../models/ModelServer.js');
async function addServer(id, prefix) {
    if(prefix.length > 3) {
        error = true;
        return error;
    }
    if(prefix.length <= 3) {
        var create = await Server.find({ server_id: id });
        if(!create || create == null || create == "[]" || create.length == 0)  {
            create = await Server.create({
                server_id: id,
                prefix,
                bem_vindo: null,
                bye_bye: null,
                channel_bem_vindo: null,
                channel_bye_bye: null,
                block_link: null
            })
            error = false;
            return error;
        } else {
            create = await Server.findOneAndUpdate({
                server_id: id
            }, {
                $set: {
                    prefix
                }
            }, {
                new: true
            })
            error = false;
            return error;
        }
    }
}
module.exports = addServer;