module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

  if (!ar.includes(params.table)) return false;

let stmt = db.prepare(`SELECT * FROM ${params.table}`);

let clm = stmt.columns();

let clms = clm.map(c => {
 return `(${c.name} ${c.type})`
}).join(", ");

let obj = { table: clm[0].table, columns: clms }

return obj;
};
