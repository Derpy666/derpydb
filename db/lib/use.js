module.exports = function(db, params, options) {
  
const Database = require("better-sqlite3")

return new Database(params.path)

};
