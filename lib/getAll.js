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
let keys = Object.keys(item).filter(x => x !== "id")
keys.map((key, index) => {
	item[key] = parse(item[key])
	return item[key]
})
return item
})

  return entry;
};