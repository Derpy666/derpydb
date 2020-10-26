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

const path = `${db.name.split(".").reverse()[1]}-${params.date}.sqlite`

let file = fs.existsSync("./db/backups/" + path)

if(file === false) return false;

let dbName = db.name.split(".")

let backup = `${db.name.split(".")[dbName.length - 1]}-${getDate(new Date())}.sqlite`

fs.copyFileSync(db.name, `db/backups/${backup}`)

db.close()

deleteFile(db.name)

fs.copyFileSync(`db/backups/${path}`,db.name)

deleteFile(`db/backups/${path}`)

let Database = require("../../db/index.js")

db = new Database(db.name)

return db
};
