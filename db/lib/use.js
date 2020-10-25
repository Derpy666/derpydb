module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

db.close()

console.log(params.path)

return require("../../db/index.js")(params.path)

};
