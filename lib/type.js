const get = require("lodash/get");

module.exports = function (db, params, options) {
  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)

  if (!entry) return null;
  entry.value = JSON.parse(entry.value)

  if (params.ops.target) entry.value = get(entry.value, params.ops.target);

  return Array.isArray(entry.value) ? "array" : typeof entry.value;
};
