function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000)/100),
	    seconds = parseInt((duration/1000) % 60),
	    minutes = parseInt((duration/(1000 * 60)) % 60),
	    hours = parseInt((duration/(1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}
const Discord = require("discord.js");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    switch(args[0]) {
        case 'profissao':
            var time = new Date()
            if(user.date_job < time.getTime()) return message.channel.send("**[DELAY]** você já pode trocar de emprego, use `"+prefix+"trabalhar {emprego}`.");
            message.channel.send("**[DELAY]** falta `"+msToTime(user.date_job-time.getTime())+"` para você poder trocar de profissão novamente.");
            break;
        case 'salario':
            message.channel.send("**[DELAY]** falta `"+msToTime(user.salary)+"` para você receber seu salário novamente.");
            break;
        case 'delays':
            message.channel.send("**[DELAY]** Esses são os delays disponível para você verificar » `\n"+prefix+"time salario\n"+prefix+"time profissao`");
            break;
    }
};
exports.config ={
    name: 'time',
    status: true,
    help: 'Esse comando você pode ver o delay de cada função que quiser para ver a lista de delays use o sub-comando `delays`.',
    emojicommand: '⏲️',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
};