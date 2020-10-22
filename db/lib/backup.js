const Discord = require("discord.js")
const { exec } = require("child_process")

module.exports = function(db, params, options) {

let fixedDate = new Intl.DateTimeFormat('en', { timeZone: 'Israel', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(Date.now())
  
function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}`;
  }

/*const fs = require('fs');

const path = `./${db.name}`

const content = fs.readFileSync(path)

let attch = new Discord.MessageAttachment(content, `${String(db.name).splite(".")[0]}-${getDate(new Date(fixedDate))}.sqlite`)

return attch*/

let path = db.name
let backup = `${db.name.split(".")[0]}-${getDate(new Date(fixedDate))}.sqlite`

exec(`copy ${path} ${backup} && move ${backup} backups`)

return `New Backup created (/backups/${backup})`

};
