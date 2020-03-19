const mongoose = require("mongoose");
const User = require("../models/ModelUser");
const Skill = require("../models/ModelSkill");
const Discord = require("discord.js");
const searchPrefix = require('./searchPrefix');
const removeMoney = require("./removeMoney");
const addMoney = require("./addMoney");
async function batalharUser(author, user, guild_id) {
    const userMandation = await User.findOne({ user_id: author.user.id });
    const battleMandation = await User.findOne({ user_id: user.user.id });
    const userSkill = await Skill.findOne({ user_id: author.user.id });
    const battleSkill = await Skill.findOne({ user_id: user.user.id });
    await searchPrefix(guild_id);
    enviar = false;
    embed = false;
    messageInvite = "Não retornamos nada.";
    if(userMandation == null) {
        enviar = true;
        messageInvite = "Você não tem uma conta registrada em nosso sistema, use ``"+teste_prefixo+"iniciar``.";
    } else if(battleMandation == null) {
        enviar = true;
        messageInvite = "O usuário mencionado não tem uma conta registrada em nosso sistema, espere até ele criar.";
    } else {
        if(userMandation.money < 100 && battleMandation.money < 100) {
            enviar = true;
            messageInvite = "Você e o usuário mencionado precisa ter pelo menos 100 Coins.";
        }
        let userForca = userSkill.forcalevel;
        let battleForca = battleSkill.forcalevel;
        if(userForca > battleForca) {
            let newValue = battleMandation.money / 100 * 13;
            newValue = newValue.toFixed(0);
            await removeMoney(newValue, user.user.id);
            await addMoney(newValue, author.user.id);
            embed = {
                title: `Batalha (${author.user.username} VS ${user.user.username})`,
                color: "a9a9a9",
                field: {
                    quantidade: 2,
                    fields: [["**Lutadores » **", author.user.username+" VS "+user.user.username, false],["**Vencedor » **", author.user.username, false],["**O usuário "+user.user.username+" perdeu » **", newValue+" Coins", false]]
                },
                images: [author.user.username, author.user.avatarURL]
            };
        }
        if(battleForca > userForca) {
            let newValue = userMandation.money / 100 * 13;
            newValue = newValue.toFixed(0);
            await removeMoney(newValue, author.user.id);
            await addMoney(newValue, user.user.id);
            embed = {
                title: `Batalha (${author.user.username} VS ${user.user.username})`,
                color: "a9a9a9",
                field: {
                    quantidade: 2,
                    fields: [["**Lutadores » **", author.user.username+" VS "+user.user.username, false],["**Vencedor » **", user.user.username, false],["**O usuário "+author.user.username+" perdeu » **", newValue+" Coins", false]]
                },
                images: [author.user.username, author.user.avatarURL]
            };
        }
    }
    return enviar, messageInvite, embed;
}
module.exports = batalharUser;