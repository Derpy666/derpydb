module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

require("../../db/index.js")(new Database(params.path))

};
