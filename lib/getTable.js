module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

  if (!ar.includes(params.ops.table)) return false;

let stmt = db.prepare(`SELECT * FROM ${params.ops.table}`);

let clm = stmt.columns();

let obj = { table: clm[0].table }

let clms = clm.map(c => {
obj[c.name] = c.type
 return obj
})

return obj;
};
