const unset = require("lodash.unset");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return false;
  else {
delete entry.id
entry = JSON.parse(entry);
}
  try {
    entry = JSON.parse(entry);
  } catch (e) {}

  if (typeof entry === "object" && params.ops.target) {
    unset(entry, params.ops.target);
    entry = JSON.stringify(entry);
    db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
      entry,
      params.id
    );
    return true;
  } else if (params.ops.target) throw new TypeError("Target is not an object.");
  else db.prepare(`DELETE FROM ${options.table} WHERE id = (?)`).run(params.id);

  return true;
};
