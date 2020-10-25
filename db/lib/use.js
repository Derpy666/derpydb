module.exports = function(db, params, options) {

db.close()

let Database = require("../../db/index.js")

return new Database(params.path)

};
