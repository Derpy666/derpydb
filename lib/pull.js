const get = require("lodash/get");
const set = require("lodash/set");

module.exports = function(db, params, options) {
  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)

  if (!entry) {
    db.run(`INSERT INTO ${options.table} (id) VALUES ('${params.id}')`)
    entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)
  }

  if(!entry.value) entry.value = "[]"

  if (params.ops.target) {
    entry.value = JSON.parse(entry.value);
    if (typeof entry.value !== 'object') throw new TypeError('Cannot pull from a non-object.');
    let oldArray = get(entry.value, params.ops.target);
    if (oldArray === undefined) oldArray = [];
    else if (!Array.isArray(oldArray)) throw new TypeError('Target is not an array.');
    oldArray = oldArray.filter(item => {
      if(typeof item == "object" && typeof params.data == "object") return JSON.stringify(item) !== JSON.stringify(params.data)
      else return item !== params.data
    })
    params.data = set(entry.value, params.ops.target, oldArray);
  } else {
    if (entry.value === '{}') entry.value = [];
    else entry.value = JSON.parse(entry.value);
    if (!Array.isArray(entry.value)) throw new TypeError('Target is not an array.');
    entry.value = entry.value.filter(item => {
      if (typeof item == "object" && typeof params.data == "object") return JSON.stringify(item) !== JSON.stringify(params.data)
      else return item !== params.data
    });
    params.data = entry.value;
  }

  params.data = JSON.stringify(params.data).replace(/'/g, "''");


  db.run(`UPDATE ${options.table} SET value = '${params.data}' WHERE id = '${params.id}'`)

  entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)
  if (entry.value === '{}') return null;
  else {
    entry.value = JSON.parse(entry.value)
    return entry.value
  }

};
