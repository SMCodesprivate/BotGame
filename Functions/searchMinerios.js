const mongoose = require('mongoose');
const Mine = require("../models/ModelMinerios");
const Discord = require("discord.js");
async function searchMinerios(modelar, avatarname, avatarurl) {
    var minerios = await Mine.find();
    if(modelar && modelar == true) {
        let embedListMinerios = new Discord.RichEmbed()
            .setColor("#555555")
            .setTitle("Minérios disponíveis")
            .addBlankField()
            .setTimestamp()
	        .setFooter(avatarname, avatarurl);
        minerios.map(minerio => {
            var { name, emoji, valor, durabilidade } = minerio;
            embedListMinerios
                .addField("Minerio » ", name, false)
                .addField("Emoji » ", emoji, false)
                .addField("Valor » ", valor, false)
                .addField("Durabilidade » ", durabilidade, false)
                .addBlankField()
        });
    } else {
        let embedListMinerios = new Discord.RichEmbed()
            .setColor("#555555")
            .setTitle("Minérios disponíveis")
            .setDescription("No momento estamos sem nenhum minério.")
            .setTimestamp()
	        .setFooter(avatarname, avatarurl);
    }
    return embedListMinerios;
}

module.exports = searchMinerios;