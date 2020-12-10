module.exports = function(db, params, options) {
  let entry = db.prepare(`SELECT * FROM sqlite_master`).all();

  let ar = entry.map(table => table.name);

if(!params) params = {}
if(!params.ops) params.ops = {}

if(!params.ops.table) return false

  if (!ar.includes(params.table)) return false;

let arr = Object.keys(params.ops).filter(x => x !== "id").filter(x => x !== "table")

if(arr.length == 0) arr.push("value")
let callums = arr.map(x => {
if(!params.ops[x]) params.ops[x] = "text"
return `${x} ${params.ops[x].toUpperCase()}`
})

callums.unshift("id TEXT")
callums.unshift(`table ${params.ops.table}`)

let obj = {}

callums.map(x => {
let item = x.split(" ")
obj[item[0]] = item[1]
return obj
})

let Database = require("../index.js")
let derpydb = new Database(db.name)

let old = derpydb.all({ table: params.table })
derpydb.deleteTable({ table: params.table })
derpydb.createTable(obj)

old.map(data => {
	let callums = Object.keys(data)
	callums = callums.filter(x => x !== "id")
	return callums.map(cal => {
		return derpydb.set(data.id, data[cal], { table: params.ops.table, target: cal })
	})
})

return true

};
