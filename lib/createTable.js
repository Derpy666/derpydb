module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

if(!params) params = {}
if(!params.ops) params.ops = {}

if(!params.ops.table) return false

  if (ar.includes(params.ops.table)) return false;

let arr = Object.keys(params.ops).filter(x => x !== "id").filter(x => x !== "table")

if(arr.length == 0) arr.push("value")
let callums = arr.map(x => {
if(!params.ops[x]) params.ops[x] = "text"
return `${x} ${params.ops[x].toUpperCase()}`
})

callums.unshift("id TEXT")

  db.prepare(`CREATE TABLE ${params.ops.table} (${callums.join(", ")})`).run();

return true

};
