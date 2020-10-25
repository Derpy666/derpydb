module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

db.close()

return require("../../db/index.js")(params.path)

};
