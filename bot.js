// https://discordapp.com/oauth2/authorize?client_id=639077779383648266&permissions=2147479031&scope=bot
const Discord = require("discord.js");
config = require("./config.json"),
SMCodes = new Discord.Client(),
Channel = require("./models/ModelChannel"),
fs = require('fs'),
searchPrefix = require("./Functions/searchPrefix"),
Server = require("./models/ModelServer"),
User = require("./models/ModelUser"),
mongoose = require('mongoose'),
fuc = require("./Functions/functions"),
prox = require("./Functions/continue"),
sessionStart = require("./Functions/session");

SMCodes.commands = new Discord.Collection();
SMCodes.aliases = new Discord.Collection();
mongoose.connect('mongodb+srv://SMCodes:samuelpvp@omnistack9-kbth1.mongodb.net/botrpg?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


SMCodes.on("guildMemberAdd", async member => {
	const verificar = await Server.findOne({ server_id: member.guild.id });
	if(verificar != null) {
		if(verificar.bem_vindo != null && verificar.channel_bem_vindo != null) {
			canal = SMCodes.channels.get(verificar.channel_bem_vindo);
			canal.send(verificar.bem_vindo);
		}
	}
});
SMCodes.on("guildMemberRemove", async member => {
	const verificar = await Server.findOne({ server_id: member.guild.id });
	if(verificar != null) {
		if(verificar.bye_bye != null && verificar.channel_bye_bye != null) {
			canal = SMCodes.channels.get(verificar.channel_bye_bye);
			canal.send(verificar.bye_bye);
		}
	}
});

var comandos = [];
fs.readdir('./comandos', function(err,file) {
	if(err) console.log(err)
	let jsfile = file.filter(f => f.split('.')
	.pop() === 'js')
	if(jsfile.length < 0) {
		console.log('Não temos nenhum comando na pasta de Comandos.')
	}
	jsfile.forEach(function (f, i) {
        let pull = require(`./comandos/${f}`)
        comandos.push({ name: pull.config.name, help: pull.config.help, permission: pull.config.permission });
		SMCodes.commands.set(pull.config.name, pull)
		pull.config.aliases.forEach(function(alias) {
			SMCodes.aliases.set(alias, pull.config.name)
		})
	})
});
fs.readdir('./Jobs', function(err,file) {
	if(err) console.log(err)
	let jsfile = file.filter(f => f.split('.')
	.pop() === 'js')
	if(jsfile.length < 0) {
		console.log('Não temos nenhum comando na pasta de Jobs.')
	}
	jsfile.forEach(function (f, i) {
        let pull = require(`./Jobs/${f}`)
        comandos.push({ name: pull.config.name, help: pull.config.help, permission: pull.config.permission });
		SMCodes.commands.set(pull.config.name, pull)
		pull.config.aliases.forEach(function(alias) {
			SMCodes.aliases.set(alias, pull.config.name)
		})
	})
});
SMCodes.on("ready", async () => {
    var usrs = await User.find();
    usrs.map(async us => {
        await User.findOneAndUpdate({
            user_id: us.user_id
        }, {
            mining: false
        });
        var x = 600;
        setInterval(() => fuc.getSalary(us, x, SMCodes), x);
    });
	console.log(`Bot foi iniciado, com ${SMCodes.users.size} usuários, em ${SMCodes.channels.size} canais, em ${SMCodes.guilds.size} servidores.`);
	setInterval(() => fuc.setStatus(SMCodes), 10000);
    setInterval(() => fuc.repairEnergy(), 15000);
});
var users_data = [];
SMCodes.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var { tt, position, infos } = prox.is(message.author.id);

    if(tt === true) {
        sessionStart(message, infos, users_data);
        return;
    }

    var verificar = await Channel.findOne({ channel_id: message.channel.id });
    var prefix = await searchPrefix(message.mentions._guild.id);
    var status = await fuc.verificationStaffer(message.author.id);

    var ve = await fuc.verifyLock(message, SMCodes, verificar);
    if(ve === true) return;

	var servidor = await Server.findOne({ server_id: message.mentions._guild.id });
    
    ve = await fuc.verifyLink(message, SMCodes, servidor);
    if(ve === true) return;

	if(message.content.startsWith(`<@!${SMCodes.user.id}>`)){
		if(prefix) {
            message.channel.send(` **Oi**, **eu me chamo ${SMCodes.user.username} e meu prefixo é **\`${prefix}\` `);
        }
	}
	if(prefix) {
		const usuario = await User.findOne({ user_id: message.author.id });
		if(!message.content.startsWith(prefix)) return
		let args = message.content.slice(prefix.length).trim().split(" ")
		let cmd = args.shift().toLowerCase()
		let commandFile = SMCodes.commands.get(cmd) || SMCodes.commands.get(SMCodes.aliases.get(cmd))
		if(!commandFile) {
		} else {
            message.delete().catch(O_o=>{});
			if(usuario != null && usuario.banido === true) {
				message.reply("Você está banido de nosso sistema não pode usar nenhum comando.");
			} else {
                if(usuario !== null && usuario.server_id != message.guild.id) {
                    console.log("O usuário "+usuario.user_id+" trocou de servidor para o "+message.guild.id);
                    await User.findOneAndUpdate({
                        user_id: message.author.id
                    }, {
                        server_id: message.guild.id
                    });
                }
                var st = true;
                comandos.map(comando => {
                    if(cmd === comando.name) {
                        if(usuario !== null && usuario.cargo > comando.permission) {
                            st = false;
                        }
                    }
                });
                if(st === false) return message.reply("Você não tem permissão para executar esse comando.");
                var author = message.guild.members.get(message.author.id);
				commandFile.run(SMCodes, message, args, author, prefix, message.mentions._guild, usuario);
			}
		}
	}
});
SMCodes.login(config.token);