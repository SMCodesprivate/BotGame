const Discord = require("discord.js");
// const mongoose = require("mongoose");
async function createRichEmbed(title, color, fieldQuantidade, fieldsMandados, images, thumbnail) {
    created = new Discord.RichEmbed()
        .setTitle(title)
        .addBlankField();
    if(color[0] == true) {
        created.setColor("#"+color[1]);
    }
    if(thumbnail && thumbnail[0] == true) {
        created.setThumbnail(thumbnail[1]);
    }
    x = 0;
    while(x <= fieldQuantidade) {
        teste = fieldsMandados[x];
        created.addField(teste[0], teste[1], teste[2]);
        x = x + 1;
    }
    if(images[0] == true) {
        created.setTimestamp().setFooter(images[1], images[2]);
    }
    return created;
}

module.exports = createRichEmbed;