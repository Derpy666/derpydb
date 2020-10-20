const Discord = require("discord.js")
const bot = new Discord.Client()

let config = require("./config")
bot.config = config;
bot.prefix = config.prefix

bot.login(config.token)
