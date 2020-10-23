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

const path = `${String(db.name).split(".")[0]}-${params.date}.sqlite`

let file = fs.existsSync("./db/backups/" + path)

if(file === false) return false;

let backup = `${db.name.split(".")[0]}-${getDate(new Date())}.sqlite`

let files = fs.readdirSync("./db/backups/")

fs.copyFileSync(`db/backups/${path}`, `old-${db.name}`)

deleteFile(`db/backups/${path}`)

fs.copyFileSync(db.name, `db/backups/${backup}`)

db.close()

deleteFile(db.name)
fs.renameAsync(`old-${db.name}`, db.name)

db.open()

return true
};
