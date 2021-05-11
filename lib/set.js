const set = require("lodash/set");
const get = require("lodash/get");

module.exports = function (db, params, options) {

  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = ('${params.id}')`)

  if (!entry) {
    db.run(`INSERT INTO ${options.table} (id,value) VALUES ('${params.id}','{}')`)
    entry = db.run(`SELECT * FROM ${options.table} WHERE id = ('${params.id}')`)
  }

  entry = JSON.parse(entry.value);

  if (typeof entry === 'object' && params.ops.target) {
    params.data = set(entry, params.ops.target, params.data);
  } else if (params.ops.target) throw new TypeError('Cannot target a non-object.');

  params.data = JSON.stringify(params.data).replace(/'/g, "''");;

  db.run(`UPDATE ${options.table} SET value = ('${params.data}') WHERE id = ('${params.id}')`);

  entry = db.run(`SELECT * FROM ${options.table} WHERE id = ('${params.id}')`).value
  if (entry === '{}') return null;
  else {
    return JSON.parse(entry)
  }



};

