module.exports = function(db, params, options) {
  try {
    let entry = db.run("SHOW TABLES")
    return entry.map(x => Object.values(x)).flat(1)
  } catch (e) {
    let entry = db.run("SELECT * FROM sqlite_master")
    return entry.map(table => table.name);
  }


};
