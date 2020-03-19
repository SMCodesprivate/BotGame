const mongoose = require('mongoose');
const User = require('../models/ModelUser');
async function addMoney(valor, userid, nex) {
    let adicionar = await User.findOne({ user_id: userid });
    const { money } = adicionar;
    const newValue = parseInt(money) + parseInt(valor);
    adicionar = await User.findOneAndUpdate({
        user_id: userid
    }, {
        $set: {
            money: newValue
        }
    }, {
        new: true
    })
}
module.exports = addMoney;