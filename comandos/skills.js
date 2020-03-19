const Discord = require("discord.js");
const User = require("../models/ModelUser");
const Skill = require("../models/ModelSkill");
const addPoint = require("../Functions/addPoint.js");
exports.run = async (SMCodes, message, args, author) =>{
    const achar = await User.findOne({ user_id: message.author.id });
    let autor = message.guild.members.get(message.author.id);
    // searchPrefix(message.author.id);
    async function Upar(vezes) {
        const teste = await User.findOne({ user_id: message.author.id });
        var skills = await Skill.findOne({ user_id: message.author.id });
        let priceforca = skills.forcalevel * 20 * vezes;
        let pricemine = skills.minelevel * 28 * vezes;
        let priceqi = skills.qilevel * 3 * vezes;
        let pricespeed = skills.speedlevel * 13 * vezes;
        let pricestamina = skills.staminalevel * 20 * vezes;
        var embedSkillUp = new Discord.RichEmbed()
            .setTitle("**Adicionar SkillPoint**")
            .setColor("#333333")
            .addBlankField()
            .addField("<:forca:640376514063368212> Força » ", skills.forcalevel+" 💸 "+priceforca, false)
            .addField("🛠 Mineração » ", skills.minelevel+" 💸 "+pricemine, false)
            .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel+" 💸 "+priceqi, false)
            .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel+" 💸 "+pricespeed, false)
            .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel+" 💸 "+pricestamina, false)
            .addBlankField()
            .addField("💰 Money » ", teste.money, false)
            .setTimestamp()
            .setFooter(message.author.username, autor.user.avatarURL);
        message.channel.send(embedSkillUp).then(async msg => {
            await msg.react("640376514063368212")
            await msg.react("🛠")
            await msg.react("640371580127412225")
            await msg.react("640373090697871380")
            await msg.react("640374989341589556")
            let filtro = (reaction, user) => (reaction.emoji.name === '🛠')  && user.id === message.author.id || (reaction.emoji.id === '640376514063368212', '640371580127412225', '640373090697871380', '640374989341589556') && user.id === message.author.id;
            const collector = msg.createReactionCollector(filtro, {max: 1, time: 20000});
            let steste = 1 * vezes;
            collector.on("collect", r => {
                switch(r.emoji.id) {
                    case '640376514063368212':
                        if(teste.money < priceforca) {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("💰 Você não tem money suficiente » ", "💸 "+teste.money, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                        } else {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("<:forca:640376514063368212> Força » ", skills.forcalevel + steste, false)
                                .addField("🛠 Mineração » ", skills.minelevel, false)
                                .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel, false)
                                .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel, false)
                                .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                            setTimeout(function() {
                                msg.delete();
                                Upar(vezes);
                            }, 2000)
                            addPoint(message.author.id, "forcalevel", teste.money, priceforca, vezes);
                        }
                    break;
                    case '640371580127412225':
                        if(teste.money < priceqi) {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("💰 Você não tem money suficiente » ", "💸 "+teste.money, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                        } else {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("<:forca:640376514063368212> Força » ", skills.forcalevel, false)
                                .addField("🛠 Mineração » ", skills.minelevel, false)
                                .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel+steste, false)
                                .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel, false)
                                .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                            setTimeout(function() {
                                msg.delete();
                                Upar(vezes);
                            }, 2000)
                            addPoint(message.author.id, "qilevel", teste.money, priceqi, vezes);
                        }
                    break;
                    case '640373090697871380':
                        if(teste.money < pricespeed) {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("💰 Você não tem money suficiente » ", "💸 "+teste.money, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                        } else {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("<:forca:640376514063368212> Força » ", skills.forcalevel, false)
                                .addField("🛠 Mineração » ", skills.minelevel, false)
                                .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel, false)
                                .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel+steste, false)
                                .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                            setTimeout(function() {
                                msg.delete();
                                Upar(vezes);
                            }, 2000)
                            addPoint(message.author.id, "speedlevel", teste.money, pricespeed, vezes);
                        }
                    break;
                    case '640374989341589556':
                        if(teste.money < pricestamina) {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("💰 Você não tem money suficiente » ", "💸 "+teste.money, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                        } else {
                            var embedDiscordUpado = new Discord.RichEmbed()
                                .setTitle("**Adicionado SkillPoint**")
                                .setColor("#333333")
                                .addBlankField()
                                .addField("<:forca:640376514063368212> Força » ", skills.forcalevel, false)
                                .addField("🛠 Mineração » ", skills.minelevel, false)
                                .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel, false)
                                .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel, false)
                                .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel+steste, false)
                                .addBlankField()
                                .setTimestamp()
                                .setFooter(message.author.username, autor.user.avatarURL)
                            msg.edit(embedDiscordUpado);
                            setTimeout(function() {
                                msg.delete();
                                Upar(vezes);
                            }, 2000)
                            addPoint(message.author.id, "staminalevel", teste.money, pricestamina, vezes);
                        }
                    break;
                }
                if(r.emoji.name == '🛠') {
                    if(teste.money < pricemine) {
                        var embedDiscordUpado = new Discord.RichEmbed()
                            .setTitle("**Adicionado SkillPoint**")
                            .setColor("#333333")
                            .addBlankField()
                            .addField("💰 Você não tem money suficiente » ", "💸 "+teste.money, false)
                            .addBlankField()
                            .setTimestamp()
                            .setFooter(message.author.username, autor.user.avatarURL)
                        msg.edit(embedDiscordUpado);
                    } else {
                        var embedDiscordUpado = new Discord.RichEmbed()
                            .setTitle("**Adicionado SkillPoint**")
                            .setColor("#333333")
                            .addBlankField()
                            .addField("<:forca:640376514063368212> Força » ", skills.forcalevel, false)
                            .addField("🛠 Mineração » ", skills.minelevel+1, false)
                            .addField("<:cerebro:640371580127412225> QI » ", skills.qilevel, false)
                            .addField("<:rapidez:640373090697871380> Speed » ", skills.speedlevel, false)
                            .addField("<:stamina:640374989341589556> Stamina » ", skills.staminalevel, false)
                            .addBlankField()
                            .setTimestamp()
                            .setFooter(message.author.username, autor.user.avatarURL)
                        msg.edit(embedDiscordUpado);
                        setTimeout(function() {
                            msg.delete();
                            Upar(vezes);
                        }, 2000)
                        addPoint(message.author.id, "minelevel", teste.money, pricemine, vezes);
                    }
                }
            })
        });
    }
    if(!achar) return message.reply("Você não tem uma conta registrada em nosso sistema, utilize ``"+teste_prefixo+"iniciar``");
    if(args[0]) {
        if(args[0] == "up" || args[0] == "upar") {
            if(args[1]) {
                if(isNaN(args[1]) === true) return message.reply("Digite um número como valor.");
                let asd = parseInt(args[1]);
                Upar(asd);
            } else {
                Upar(1);
            }
            return;
        }
    }
    var skills = await Skill.findOne({ user_id: message.author.id });
    var embedSkills = new Discord.RichEmbed()
        .setTitle("**Skills de "+message.author.username+"**")
        .setColor("#444444")
        .setThumbnail(author.user.avatarURL)
        .setTimestamp()
        .addBlankField()
        .addField("**Força**", "```"+skills.forcalevel+"```", true)
        .addField("**Mineração**", "```"+skills.minelevel+"```", true)
        .addField("**QI**", "```"+skills.qilevel+"```", false)
        .addField("**Speed**", "```"+skills.speedlevel+"```", true)
        .addField("**Stamina**", "```"+skills.staminalevel+"```", true)
        .setFooter(message.author.username, autor.user.avatarURL)
        .addBlankField()
    message.channel.send(embedSkills.addBlankField());
};
exports.config ={
    name: 'skills',
    status: true,
    help: 'Esse comando você vê as skills de sua conta, ou de outros jogadores.',
    emojicommand: '⚔',
    aliases: [],
    category: 'RPG',
    categoryemoji: '⚒'
}