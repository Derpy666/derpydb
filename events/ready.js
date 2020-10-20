const Discord = require("discord.js")

module.exports.run = async bot => {
  process.bot = bot;

const fetch = require("node-fetch");
const { exec } = require("child_process")

  console.log(`${bot.user.tag} is Ready!`);

const { guildID } = bot.config

let guild = bot.guilds.cache.get(guildID)

  bot.roles = new Discord.Collection();
    bot.roles = guild.roles

};
