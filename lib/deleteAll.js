module.exports = function(db, params, options) {
  db.prepare(`DELETE FROM ${options.table}`).run();

  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

  return entry;
};
