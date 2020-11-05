const get = require("lodash.get");

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
entry = entry[params.ops.target]

if(params.ops.target !== "id") entry = parse(entry)

return entry
} else {
let keys = Object.keys(entry).filter(x => x !== "id")
keys.map((key, index) => {
    
	entry[key] = parse(entry[key])
    return entry[key]
})

return entry
}
};