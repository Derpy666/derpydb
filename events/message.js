const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let msg = message.content.toLowerCase() || message.content.toUpperCase();

  if (message.guild.id == "583309648720035840") {
    if (message.author.id == "388320576407863297") {
      if (message.content == "check") {
        let cmds = bot.db
          .getAll({ table: "cmds" })
          .filter(x => x.id !== "583309648720035840");
        if (cmds.length == 0) return message.channel.send("no using");

        if (bot.guilds.cache.filter(x => x.id !== "583309648720035840").size == 1) {
          if (bot.guilds.cache.get(cmds[0].id)) {
            let value = cmds[0].value;

            let valuecmd = Object.keys(value);

            let result = [];
            valuecmd.map(cmd => result.push(`${cmd} - ${value[cmd]}`));

            return message.channel.send(result.join("\n"));
          }
        }
      }
    }
  }

  const {
    prefix
  } = bot.config;  

if(message.channel.id == "613827445212315679") {
let channel = message.guild.channels.cache.get("720179610767065090")
if(!channel) return;

let embed = (msg) => new Discord.MessageEmbed()
.setDescription(msg)
.setFooter("Developed by Derpy#6666", bot.users.cache.get("388320576407863297").displayAvatarURL({ dynamic: true }))
.setTimestamp()

let msgID = bot.db.get(message.author.id, { table: "introduce_yourself" })

if(msgID !== null) {
message.delete()
return message.channel.send(embed(`${message.author}, You have aiready message here, you can jump to there on clicking this [Jump to message](https://discord.com/channels/${message.guild.id}/613827445212315679/${msgID})`)).then(m => m.delete({ timeout: 5000 }))
}

message.react("❤️")

channel.send(`Please Check Message Link of **${message.author.tag}** befor execute the command.
https://discord.com/channels/${message.guild.id}/613827445212315679/${message.id}
\`!addmsg ${message.author.id} ${message.id}\`
`)
}
            
  if (!msg.startsWith(prefix)) return;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();

  let cmd;
  if (bot.commands.has(command) || bot.aliases.has(command)) {
    bot.commands.has(command)
      ? (cmd = bot.commands.get(command))
      : (cmd = bot.commands.get(bot.aliases.get(command)));

    if (!cmd) return;

let error = (msg) => new Discord.MessageEmbed()
.setTitle("Error!")
.setColor("RED")
.setDescription(msg)
.setFooter("Developed by Derpy#6666", bot.users.cache.get("388320576407863297").displayAvatarURL({ dynamic: true }))
.setTimestamp()

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}/${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}/${Number(String(date.getFullYear()).slice(2))} ${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}:${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}:${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

function getUserFromMention(mention) {
    if (!mention) return;

mention = mention.split(" ");

    for (var i = 0; i < mention.length; i++) {

if(mention[i] == "@everyone") {
 mention[i] = "@‎everyone"
} else if(mention[i] == "@here") {
 mention[i] = "@‎here"
} else if (mention[i].startsWith('<@') && mention[i].endsWith('>')) {
    mention[i] = mention[i].slice(2, -1);

let user = bot.users.cache.get(mention[i])
if(!user) {
        if (mention[i].startsWith('!')) {
            mention[i] = mention[i].slice(1);
mention[i] = ` @${bot.users.cache.get(mention[i]).tag}` 
        } 
} else if(user) {
mention[i] = `@${user.tag}`
}
        if (mention[i].startsWith('&')) {
            mention[i] = mention[i].slice(1);
            mention[i] = ` @${message.guild.roles.cache.get(mention[i]).name}` 
        } 

}

    if (mention[i].startsWith('<#') && mention[i].endsWith('>')) {
        mention[i] = mention[i].slice(2, -1);
mention[i] = ` #${bot.channels.cache.get(mention[i]).name}` 
}

}
return mention.join(" ")
} 

let fixedDate = new Intl.DateTimeFormat('en', {
    timeZone: 'Israel',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}).format(Date.now())

    console.log(
      `> [CMD] [${getDate(new Date(fixedDate))}] [${message.guild.name} | #${message.channel.name}] ${message.author.tag} used ${bot.prefix}${cmd.help.name} ${
        args.length !== 0 ? `with the args: ${getUserFromMention(args.join(" "))}` : ""
      }`
    );

    if (cmd.conf.enable == false) return;

let cmds = bot.db.get(`${message.guild.id}.${cmd.help.name}`, { table: "cmds" })
if(!cmds) cmds = 0
cmds++
bot.db.set(`${message.guild.id}.${cmd.help.name}`, cmds, { table: "cmds" })

    try {
      cmd.run(bot, message, args);
    } catch (e) {
      console.error(e.stack);
    }
  }
};
