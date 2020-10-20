const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let msg = message.content.toLowerCase() || message.content.toUpperCase();

  const {
    prefix
  } = bot.config;  

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

    if (cmd.conf.enable == false) return;

    try {
      cmd.run(bot, message, args);
    } catch (e) {
      console.error(e.stack);
    }
  }
};
