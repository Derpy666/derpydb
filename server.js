const Discord = require("discord.js")
const bot = new Discord.Client()

let config = require("./config")
bot.config = config;
bit.prefix = config.prefix

bot.login(config.token)
