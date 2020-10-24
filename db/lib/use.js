module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

db.close()

db = new Database(params.path)

return require("../../db/index.js")(db)

};
