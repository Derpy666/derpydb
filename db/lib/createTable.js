module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

if(!params.ops) return false

  if (ar.includes(params.ops.table)) return false;

let arr = Object.keys(params.ops)
arr = arr.filter(x => x !== "table")
let callums = arr.map(x => {
return `${x} ${params.ops[x].toUpperCase()}`
}).join(", ")

  db.prepare(`CREATE TABLE ${params.ops.table} (${callums})`).run();

return true

};
