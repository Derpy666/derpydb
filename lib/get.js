const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

  if (params.ops.target) entry = get(entry, params.ops.target);

  return entry;
};
