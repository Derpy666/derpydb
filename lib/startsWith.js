

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

entry.map(item => {
let keys = Object.keys(item);
keys.map((key, index) => {
    		try {
		item[key] = JSON.parse(item[key])
	} catch (err) {
		item[key] = item[key]
	}
})
return item
})

  return entry.filter(ent => ent.id.startsWith(params.id));
};
