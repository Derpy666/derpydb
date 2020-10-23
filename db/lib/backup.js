const Discord = require("discord.js")
const fs = require("fs")

module.exports = function(db, params, options) {

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}-${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}-${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}-${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

let path = db.name
let backup = `${db.name.split(".")[0]}-${getDate(new Date())}.sqlite`

let files = fs.readdirSync("./db/backups/").map(file => {
let stats = fs.statSync(`db/backups/${file}`)
 
   return {name:file,date:stats.mtime}
}).sort((a,b) => a.date-b.date)

let oldestFile = files[0].name

if(files.length >= 8) return `${oldestFile}`

fs.copyFile(db.name, `db/backups/${backup}`, (err) => {})

return `New Backup created (/db/backups/${backup})

WARNING: can hold only 8 backups in once, when it reach 8 it will delete the oldest backup
Currect Space: (${1 + files.length}/8)`
};
