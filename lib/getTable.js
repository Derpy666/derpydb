module.exports = function(db, params, options) {
  try {
  let entry = db.run("SHOW TABLES")
  let ar = entry.map(x => Object.values(x)).flat(1)

  if (!ar.includes(params.ops.table)) return false;

  return Object({
    table: params.ops.table,
    id: "TEXT",
    value: "TEXT"
  })
  } catch (e) {
  let entry = db.run("SELECT * FROM sqlite_master")
  let ar = entry.map(table => table.name);

  if (!ar.includes(params.ops.table)) return false;

return Object({
    table: params.ops.table,
    id: "TEXT",
    value: "TEXT"
  })
  }

  
};

