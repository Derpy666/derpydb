module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

  return entry;
};
