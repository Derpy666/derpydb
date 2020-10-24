module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

db = new Database(params.path)

require("../../db/index.js")(db)

};
