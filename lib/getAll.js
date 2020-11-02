function parse(value) {
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
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

entry.map(item => {
let keys = Object.keys(item);
keys.map((key, index) => {
	item[key] = parse(item[key])
	return item[key]
})
return item
})

  return entry;
};