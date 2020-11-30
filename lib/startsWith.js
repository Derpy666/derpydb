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
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

entry.map(item => {
	let keys = Object.keys(item)
keys.map((key, index) => {
	if(isNaN(item[key])) item[key] = parse(item[key])
return item[key]
})
return item
})

  return entry.filter(ent => ent.id.startsWith(params.id));
};
