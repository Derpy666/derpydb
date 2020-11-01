const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

  if (params.ops.target) {
entry = entry[params.ops.target]

    		try {
		entry = JSON.parse(entry)
	} catch (err) {
		entry = entry
	}

return entry
} else {
let keys = Object.keys(entry);
keys.map((key, index) => {
    		try {
		entry[key] = JSON.parse(entry[key])
	} catch (err) {
		entry[key] = entry[key]
	}
return entry[key]
})

return entry
}
};