const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const Database = require("better-sqlite3")
const bot = new Client()

let config = require("./config")
bot.config = config;
bot.prefix = config.prefix

bot.login(config.token);

bot.commands = new Collection();
bot.aliases = new Collection();

bot.db = require("./db/index.js")()

process.on("unhandledRejection", error => {
  console.error("Uncaught Promise Rejection", error);
  console.log("Restarting...");
});

const categories = readdirSync("./commands/").forEach(category => {
  const files = readdirSync(`./commands/${category}/`);
  files.forEach(file => {
    if (!file.endsWith(".js")) return console.log(`${file} is not a command`);
    var cs = require(`./commands/${category}/${file}`);
    bot.commands.set(cs.help.name, cs);
    cs.conf.aliases.forEach(a => bot.aliases.set(a, cs.help.name));
  });
});

readdirSync("./events/").forEach(evtFileName => {
  const eventFile = require(`./events/${evtFileName}`);
  const evtName = evtFileName.split(".").shift();
  bot.on(evtName, eventFile.run.bind(null, bot));
});
