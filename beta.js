const jimp = require('jimp');
const addPicareta = require('./Functions/addPicareta');
// const addPoint = require("./Functions/addPoint");
// addPoint(360247173356584960, "forcalevel");
// var dia = new Date;
// console.log(dia.getDate());
// console.log(dia)
// addPicareta();
// var infos = ['Pedra', ':pedra:', '639859023407087626', '2', '3']
// addMinerio(infos)
// searchPrefix(294012930)
// console.log(asd(4, 5))
function arrayTeste() {
    var asd = ["Morango", "Laranga"];
    let sfsdasd = asd.indexOf("Mrango");
    if(sfsdasd != -1) {
        console.log("Teste")
    }
}
async function jimpTeste(nome, imageURL, level, xp, energia) {
    const fonte = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
    const background = await jimp.read('./perfil.png');
    const avatar = await jimp.read(imageURL);
    const mask = await jimp.read('./mascara.png');
    avatar.resize(256, 256);
    mask.resize(256, 256);
    avatar.mask(mask)
    background.composite(avatar, 75, 320)
    .print(fonte, 110, 640, nome)
    .print(fonte, 780, 530, "- Level: "+level)
    .print(fonte, 780, 565, "- Xp: "+xp)
    .print(fonte, 780, 600, "- Energia: "+energia)
    .write('teste.png');
}
// exports.teste ={
//     "teste": jimpTeste()
// }
// jimpTeste("SMCodes", "./avatar.png", 5, 2, "10/10")