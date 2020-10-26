const Discord = require("discord.js")
const fs = require("fs")

module.exports = function(db, params, options) {

function getDate(date) {
    if(!date) date = new Date() 
    return `${String(date.getMonth()).length == 1 ? `0${date.getMonth()}`: date.getMonth()}-${String(date.getDate()).length == 1 ? `0${date.getDate()}` : date.getDate()}-${String(date.getHours()).length == 1 ? `0${date.getHours()}` : date.getHours()}-${String(date.getMinutes()).length == 1 ? `0${date.getMinutes()}` : date.getMinutes()}-${String(date.getSeconds()).length == 1 ? `0${date.getSeconds()}` : date.getSeconds()}`;
  }

function deleteFile(file) {
return fs.unlinkSync(file)
}

let dbName = db.name.split(".")

let path = db.name
let backup = `${db.name.split(".")[dbName.length - 1]}-${getDate(new Date())}.sqlite`

let files = fs.readdirSync("./db/backups/")

let deleted;

if(files.length >= 8) {
let oldestFile = files[0]
deleteFile(`db/backups/${oldestFile}`)
deleted = `${oldestFile} has been deleted!`
} 

fs.copyFileSync(db.name, `db/backups/${backup}`)

return `New Backup created (/db/backups/${backup})

WARNING: can hold only 8 backups in once, when it reach 8 it will delete the oldest backup
${deleted ? `\n${deleted}\n` : ""}
Current Space: (${deleted ? files.length : 1 + files.length}/8)`

};
