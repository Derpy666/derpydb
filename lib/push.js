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
   // params.data = JSON.parse(params.data);
    if (typeof entry.value !== 'object') throw new TypeError('Cannot push into a non-object.');
    let oldArray = get(entry.value, params.ops.target);
    if (oldArray === undefined) oldArray = [];
    else if (!Array.isArray(oldArray)) throw new TypeError('Target is not an array.');
    oldArray.push(params.data)
    params.data = set(entry.value, params.ops.target, oldArray);
  } else {
    if (entry.value === '{}') entry.value = [];
    else entry.value = JSON.parse(entry.value);
    // params.data = JSON.parse(params.data);
    if (!Array.isArray(entry.value)) throw new TypeError('Target is not an array.');
    entry.value.push(params.data);
    params.data = entry.value;
  }

  params.data = JSON.stringify(params.data).replace(/'/g, "''");;

  db.run(`UPDATE ${options.table} SET value = '${params.data}' WHERE id = '${params.id}'`)

  entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)
  if (entry.value === '{}') return null;
  else {
    entry.value = JSON.parse(entry.value)
    return entry.value
  }

};

