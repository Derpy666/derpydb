const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return null;
  if(params.ops.target == undefined) return null

    		try {
		entry[params.ops.target] = JSON.parse(entry[params.ops.target])
	} catch (err) {
		entry[params.ops.target] = entry[params.ops.target]
	}

  if (params.ops.target) entry = get(entry, params.ops.target);

  return Array.isArray(entry) ? "array" : typeof entry;
};
