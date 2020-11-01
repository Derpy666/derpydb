module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  return entry.map(table => table.name);
};