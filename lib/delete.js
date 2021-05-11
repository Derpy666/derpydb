const unset = require("lodash/unset");

module.exports = function(db, params, options) {
  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)

  if (!entry) return false;
  else entry.value = JSON.parse(entry.value);

  if (typeof entry.value === 'object' && params.ops.target) {
    unset(entry.value, params.ops.target);
    entry.value = JSON.stringify(entry.value).replace(/'/g, "''");;
    db.run(`UPDATE ${options.table} SET value = '${entry.value}' WHERE id = '${params.id}'`)
    return true;
  }
  else if (params.ops.target) throw new TypeError('Target is not an object.');
  else db.run(`DELETE FROM ${options.table} WHERE id = '${params.id}'`)

  return true;

};

