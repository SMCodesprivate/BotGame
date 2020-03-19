const mongoose = require('mongoose');
const User = require('../models/ModelUser');
async function removeMoney(valor, userid) {
    let remover = await User.findOne({ user_id: userid });
    var newValue = remover.money - valor;
    console.log(newValue)
    remover = await User.findOneAndUpdate({
        user_id: userid
    }, {
        $set: {
            money: newValue
        }
    }, {
        new: true
    })
}
module.exports = removeMoney;