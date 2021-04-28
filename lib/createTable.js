module.exports = function(db, params, options) {

try {
  let entry = db.run("SHOW TABLES")
  let ar = entry.map(x => Object.values(x)).flat(1)

if(!params) params = {}
if(!params.ops) params.ops = {}

if(!params.ops.table) return false

  if (!ar.includes(params.ops.table)) return false;

db.run(`CREATE TABLE IF NOT EXISTS ${params.ops.table} (id TEXT, value TEXT)`)

  return true
  } catch (e) {
  let entry = db.run("SELECT * FROM sqlite_master")
  let ar = entry.map(table => table.name);

if(!params) params = {}
if(!params.ops) params.ops = {}

if(!params.ops.table) return false

  if (!ar.includes(params.ops.table)) return false;

db.run(`CREATE TABLE IF NOT EXISTS ${params.ops.table} (id TEXT, value TEXT)`)

return true
  }

};

