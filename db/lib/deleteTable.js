module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

  if (!ar.includes(params.table)) return false;

  db.prepare(`DROP TABLE ${params.table}`).run();

  return true;
};
