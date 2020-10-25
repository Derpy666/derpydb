module.exports = function(db, params, options) {

db.close()

let Dadabase = require("../../db/index.js")

return new Database(params.path)

};
