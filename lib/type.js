const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return null;
  if(params.ops.target == undefined) return null

  if(String(entry[params.ops.target]).includes(",")) entry[params.ops.target] = String(entry[params.ops.target]).split(",")

  if (params.ops.target) entry = get(entry, params.ops.target);

  return Array.isArray(entry) ? "array" : typeof entry;
};
