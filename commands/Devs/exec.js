const Discord = require("discord.js");
const fetch = require("node-fetch");
const { exec } = require("child_process")

exports.run = async (bot, message, args) => {
  if (!bot.config.devs.includes(message.author.id)) return;

if (!args[0])
    return message.reply("You need specific CMD Code").then(m => m.delete({timeout:5000}));
  let codein = args.join(" ")
  
if (args[1] === "logs") {
	let webhook = new Discord.WebhookClient("754788617473491056", "kPdskGjmjoj6jcGf8ECLqtfY7PKvm-1Ci6TPy_28_0zd2rUnUIQFw4pJB1JsS9Ux0RDe")
	let logs = exec(codein);

logs.stderr.on("data", async data => {
	 
  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    webhook.send(`**ERROR** https://hasteb.in/${key}.js`)
  } else return webhook.send("**ERROR**," + data, { code: "js" })
})

logs.stdout.on("data", async data => {
	  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    webhook.send(`https://hasteb.in/${key}.js`)
  } else return webhook.send(data, { code: "js" })
})

} else {
    let logs = exec(codein);

logs.stderr.on("data", async data => {
	 
  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    message.channel.send(`https://hasteb.in/${key}.js`)
  } else return message.channel.send(data, { code: "js" })
})

logs.stdout.on("data", async data => {
	  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    message.channel.send(`https://hasteb.in/${key}.js`)
  } else return message.channel.send(data, { code: "js" })
})

}

 

};

exports.conf = {
  enable: true,
  aliases: []
};

exports.help = {
  name: "exec",
  category: "Devs",
  usage: "",
  desc: ""
};
