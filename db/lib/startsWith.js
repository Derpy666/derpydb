module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID`)
    .all();

  return entry.filter(ent => ent.id.startsWith(params.id));
};
