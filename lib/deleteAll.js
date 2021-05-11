module.exports = function (db, params, options) {
  db.run(`DELETE FROM ${options.table}`)

  let entry = db.run(`SELECT * FROM ${options.table}`)

  return entry;
};
