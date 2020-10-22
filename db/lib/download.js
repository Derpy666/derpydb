const Discord = require("discord.js")

module.exports = function(db, params, options) {

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}-${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}-${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}-${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

const fs = require('fs');

const path = `./backups/${String(db.name).split(".")[0]}-${params.date}.sqlite`

let file = fs.existsSync(path)

if(file === false) return false;

const content = fs.readFileSync(path)

let attch = new Discord.MessageAttachment(content, `${String(db.name).split(".")[0]}-${params.date}.sqlite`)

return attch

};
