const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return false;
  if(!params.ops.target) return false

  if (params.ops.target) entry = get(entry, params.ops.target);

  return typeof entry != "undefined";
};
