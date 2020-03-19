const Skill = require("../models/ModelSkill");
const User = require("../models/ModelUser");
const mongoose = require("mongoose");
async function addPoint(id, skill, money, price, v) {
	var ver = await Skill.findOne({ user_id:  id });
	var t = money - price;
	var infouser = await User.findOneAndUpdate({
		user_id: id
	}, {
		$set: {
			money: t
		}
	}, {
		new: true
	})
    if(skill == 'forcalevel') {
        var newValue = ver.forcalevel + (1 * v);
        ver = await Skill.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                forcalevel: newValue
            }
        }, {
            new: true
        })
    }
    if(skill == 'minelevel') {
        var newValue = ver.minelevel + (1 * v);
        ver = await Skill.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                minelevel: newValue
            }
        }, {
            new: true
        })
    }
    if(skill == 'qilevel') {
        var newValue = ver.qilevel + (1 * v);
        ver = await Skill.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                qilevel: newValue
            }
        }, {
            new: true
        })
    }
    if(skill == 'speedlevel') {
        var newValue = ver.speedlevel + (1 * v);
        ver = await Skill.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                speedlevel: newValue
            }
        }, {
            new: true
        })
    }
    if(skill == 'staminalevel') {
        var newValue = ver.staminalevel + (1 * v);
        infouser = await User.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                limitenergia: newValue
            }
        }, {
            new: true
        })
        ver = await Skill.findOneAndUpdate({
            user_id: id
        }, {
            $set: {
                staminalevel: newValue
            }
        }, {
            new: true
        })
    }
}

module.exports = addPoint;