const Discord = require("discord.js")

module.exports = function(db, params, options) {
  
const fs = require('fs');

const path = `./${db.name}`

const content = fs.readFileSync(path)

let attch = new Discord.MessageAttachment(content, `${db.name}`)

return attch

};
