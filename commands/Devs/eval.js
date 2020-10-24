const Discord = require("discord.js");
const fetch = require("node-fetch");
const Database = require("better-sqlite3")
const secrets = [process.env.TOKEN];
const replaceSecrets = (str, hid = "Hidden") => {
  secrets.forEach(s => {
    if (s) str = str.replace(s, hid);
  });
  return str;
};
const resEmbed = new Discord.MessageEmbed();
module.exports.run = async (bot, message, args) => {
  if(!bot.config.devs.includes(message.author.id)) return;

  if (!args[0])
    return message.reply("You need specific JS Code").then(m => m.delete({ timeout: 5000}));
  let codein = args.join(" ");
  resEmbed.fields = [];
  // resEmbed.addField("Input", `\`\`\`js\n${codein}\n\`\`\``, false);
  let code;
  let type;
  try {
    code = eval(codein);
    type = code && code.constructor ? code.constructor.name : typeof code;
    resEmbed.setColor("GREEN").setTitle("Success!");
  } catch (err) {
    code = err.toString();
    type = err.name;
    resEmbed.setColor("RED").setTitle("Error!");
  }
  if (type === "Promise") {
    code = await code;
    type = code && code.constructor ? code.constructor.name : typeof code;
  }

  if (typeof code !== "string")
    code = require("util").inspect(code, { depth: 0, maxArrayLength: null });
  code = code.replace(/`/g, "`\u2004");
  const output = `
\`\`\`js
/* ${type} */
${replaceSecrets(code)}
\`\`\``;
  if (output.length > 1024) {
    const { key } = await fetch("https://hasteb.in/documents", {
      method: "POST",
      body: code,
      headers: { "Content-Type": "text/plain" }
    }).then(res => res.json());
    resEmbed.setColor("BLUE");
    resEmbed.addField(
      "Yea too long",
      `[Click here!](https://hasteb.in/${key}.js 'Yes, here!')`,
      false
    );
  } else resEmbed.addField("Output", output, false);
  message.channel.send(resEmbed);
};

module.exports.conf = {
  enable: true,
  aliases: []
};

module.exports.help = {
  name: "eval",
  category: "Devs",
  usage: "eval <evalate>",
  desc: ""
};
