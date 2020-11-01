const unset = require("lodash.unset");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return false;

    if(params.ops.target) {
    db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
      null,
      params.id
    );
    } else db.prepare(`DELETE FROM ${options.table} WHERE ID = (?)`).run(params.id)

  return true;
};