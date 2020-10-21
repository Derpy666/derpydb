const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return null;

delete entry.id

  entry = JSON.parse(entry);

  try {
    entry = JSON.parse(entry);
  } catch (e) {}

  if (params.ops.target) entry = get(entry, params.ops.target);

  return typeof entry;
};
