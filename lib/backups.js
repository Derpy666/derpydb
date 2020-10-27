const Discord = require("discord.js")
const fs = require("fs")

module.exports = function(db, params, options) {

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}-${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}-${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}-${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

let files = fs.readdirSync("./db/backups/")


return `Backups Count (${files.length}/8)

${files.join("\n")}`
};
