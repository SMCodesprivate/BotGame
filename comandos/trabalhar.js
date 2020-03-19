const Discord = require("discord.js"),
Job = require("../models/ModelJob"),
User = require("../models/ModelUser");
exports.run = async (SMCodes, message, args, author, prefix, server, user) =>{
    if(!args[0]) return message.channel.send("**[JOBS]** Digite uma profissão válida e que esteja de acordo com seu level atual.");
    var job = await Job.findOne({ name: args[0].toLowerCase() });
    if(job === null) {
        job = await Job.findOne({ id: Number(args[0]) });
        if(job === null) {
            return message.channel.send("**[JOBS]** Você digitou uma profissão inválida, por favor digite uma profissão que esteja de acordo com nosso sistema, para ver as profissões digite » `"+prefix+"help empregos`");   
        }
    }
    if(user.level < job.level) return message.channel.send("**[JOBS]** Você não tem o level necessário para essa profissão, level necessário » `"+job.level+"`");
    if(user.job === job.id) return message.channel.send("**[JOBS]** Você já possui esse emprego.");
    var date = new Date();
    var time = date.getTime() - user.date_job;
    if(time < 10800000) return message.channel.send("**[JOBS]** Por favor espere 3 horas para trocar de emprego novamente.");
    date = new Date();
    await User.findOneAndUpdate({
        user_id: author.user.id
    }, {
        job: job.id,
        date_job: date.getTime(),
        salary: 0
    });
    message.channel.send("**[JOBS]** Você trocou de profissão com sucesso, a cada 1 hora você receberá `$ "+job.salary+"`, espere pelo menos 3 horas para trocar de emprego novamente.\n**["+job.name.toUpperCase()+"]** Digite `"+prefix+job.name.toLowerCase()+" comandos` para ver os comandos de sua profissão");
};
exports.config ={
    name: 'trabalhar',
    status: true,
    help: 'Esse comando proporciona experiências de nossos sistemas de empregos.',
    emojicommand: '🧰',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
};