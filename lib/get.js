const get = require("lodash.get");

function parse(value) {

	if(!isNaN(value) && typeof value !== "number") return value
	
	  try {
		  value = JSON.parse(JSON.parse(JSON.parse(JSON.parse(value))))
	  } catch (err) {
		  try {
			  value = JSON.parse(JSON.parse(JSON.parse(value)))
		  } catch (err) {
			  try {
				  value = JSON.parse(JSON.parse(value))
			  } catch (err) {
				  try {
					  value = JSON.parse(value)
				  } catch (err) {}
			  }
		  }
	  }
	  return value
	}

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

  if (params.ops.target) {
entry = entry[params.ops.target]

entry = parse(entry)

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