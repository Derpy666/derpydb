module.exports = function (db, params, options) {

  try {
    let entry = db.run("SHOW TABLES")
    let ar = entry.map(x => Object.values(x)).flat(1)

    if (!ar.includes(params.ops.table)) return false;

    db.run(`DROP TABLE ${params.ops.table}`)

    return true
  } catch (e) {
    let entry = db.run("SELECT * FROM sqlite_master")
    let ar = entry.map(table => table.name);

    if (!ar.includes(params.ops.table)) return false;

    db.run(`DROP TABLE ${params.ops.table}`)

    return true
  }
};
