const get = require("lodash/get");

function parse(elm) {
	try {
	if(isNaN(elm) === false) {
	if(typeof elm === "number") return elm;
	else if (typeof elm === "object") return elm
	}
	elm = JSON.parse(elm)
	return parse(elm)
	}
	catch(e) {
	return elm
	}
	}

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

  if (params.ops.target) {

params.ops.target = params.ops.target.split(".")
let callum = params.ops.target[0]

if(isNaN(entry[callum])) entry[callum] = parse(entry[callum])

if(params.ops.target.length > 1) entry = get(entry[callum], params.ops.target.slice(1).join("."))
else entry = entry[callum]

return entry
} else {
let keys = Object.keys(entry)
keys.map((key, index) => {
    
	if(isNaN(entry[key])) entry[key] = parse(entry[key])
    return entry[key]
})

return entry
}
};
