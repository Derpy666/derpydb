const get = require("lodash/get");

module.exports = function(db, params, options) {

  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)

  if (!entry) return null

  entry = JSON.parse(entry.value)

  if (params.ops.target) entry = get(entry, params.ops.target);

  return entry

};
