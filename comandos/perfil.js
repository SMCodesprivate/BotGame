const Discord = require("discord.js");
const User = require("../models/ModelUser");
const fs = require("fs");
const Canvas = require('canvas');
const fuc = require("../Functions/functions");
const snekfetch = require("node-superfetch");
const canvas = Canvas.createCanvas(1280, 720);
const ctx = canvas.getContext('2d');
exports.run = async (SMCodes, message, args, author, prefix, server, user) => {
    var { body: avatar } = await snekfetch.get(author.user.avatarURL);
    avatar = await Canvas.loadImage(avatar);
    var { body: bottom } = await snekfetch.get("https://i.ibb.co/dgvyqzh/perfil.png");
    var { body: background } = await snekfetch.get("https://i.ibb.co/dDd7hyz/background.jpg");
    bottom = await Canvas.loadImage(bottom);
    background = await Canvas.loadImage(background);
    ctx.drawImage(background, 0, 0, 1280, 720);
    ctx.drawImage(bottom, 0, 90, 1280, 630);
    var name = author.user.username;
    var a = "";
    if(name.length > 7) {
        var p = 0;
        for(var o = 0;o <= name.length;o++) {
            if(o < 7) {
                a += name[o];
            } else {
                while(p < 3) {
                    a += ".";
                    p++;
                }
            }
        }
    } else {
        a = author.user.username;
    }
    ctx.font = "bold 85px verdana, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(a, 15, 700);

    var t = 'Sistema RPG criado por SMCodes#0032';
    ctx.font = "bold 56px verdana, sans-serif";
    ctx.fillStyle = "#232323";
    ctx.fillText(t, 15, 100);
    

    ctx.beginPath();
    ctx.arc(190, 465, 120, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 70, 335, 250, 250);
    ctx.restore();
    
    console.log(user);
    console.log(fuc.calculate(10000000000, 2));

    const image = new Discord.Attachment(canvas.toBuffer(), "perfil.png");
    message.channel.send(image);
};
exports.config ={
    name: 'perfil',
    status: true,
    help: 'Esse comando você você suas informações do rpg.',
    emojicommand: '👤',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}