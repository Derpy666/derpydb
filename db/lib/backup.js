const Discord = require("discord.js")
const { exec } = require("child_process")

module.exports = function(db, params, options) {

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}-${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}-${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}-${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

let path = db.name
let backup = `${db.name.split(".")[0]}-${getDate(new Date())}.sqlite`

exec(`copy ${path} ${backup} && move ${backup} backups`)

return `New Backup created (/db/backups/${backup})`

};
