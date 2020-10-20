const Discord = require("discord.js")

module.exports.run = async bot => {
  process.bot = bot;

const fetch = require("node-fetch");
const { exec } = require("child_process")

let log = new Discord.WebhookClient("754788617473491056", "kPdskGjmjoj6jcGf8ECLqtfY7PKvm-1Ci6TPy_28_0zd2rUnUIQFw4pJB1JsS9Ux0RDe")
let error = new Discord.WebhookClient("765915195700019211", "S-8_MKv0OA3CNTWTGht_EeeglP1zUMEfCltBfUn-h8tWk8Mmf8SFTXEounaXSlrtogDv")

let log2 = new Discord.WebhookClient("766518705784881152", "1j8uM28dEZcAneBObwJwusZ3DVRhms0qio4_OgJ3CyPXyAS0PICjzG-NHOUMPeKwedJB")
let error2 = new Discord.WebhookClient("766518885733236786", "NSYTBovBsghhcx5e35GbyHWYTWmNsyvM0VM-NyG16c29rr3wxrfKJQfqqqqYoEj2DcdE")

exec("pm2 flush IsraelStaff") 
let logs = exec("pm2 logs IsraelStaff --raw");

logs.stderr.on("data", async data => {

  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    error.send(`https://hasteb.in/${key}.js` )
    error2.send(`https://hasteb.in/${key}.js` )
  } else {
error.send(`\`\`\`js
${data}
\`\`\``)
return error2.send(`\`\`\`js
${data}
\`\`\``)
}
})

logs.stdout.on("data", async data => {
	  if (data.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    log.send(` https://hasteb.in/${key}.js` )
    log2.send(` https://hasteb.in/${key}.js` )
  } else {
log.send(data, { code: "js" })
return log2.send(data, { code: "js" })
}
})

  console.log(`${bot.user.tag} is Ready!`);

const { guildID } = bot.config

let guild = bot.guilds.cache.get(guildID)

  bot.roles = new Discord.Collection();
    bot.roles = guild.roles

if(guild) {

    bot.user.setActivity(`Israel Staff | by Derpy#6666`, { type: 'PLAYING' });
}

  let restart = bot.channels.cache.get(bot.db.get("restart", { table: "restart" }));

  if(restart) {
    await restart.send("Restarted!");
    bot.db.delete("restart", { table: "restart" });
  }

};
