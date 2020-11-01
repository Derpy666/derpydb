const set = require("lodash.set");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`).get(params.id)

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (id) VALUES (?)`).run(
      params.id
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

if(params.ops.target == undefined) return null

  if(isNaN(params.data) || Array.isArray(params.data)) {
    try {
    params.data = JSON.stringify(params.data)
  } catch (err) {
    params.data = params.data
  }
  }

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

        try {
    entry[params.ops.target] = JSON.parse(entry[params.ops.target])
  } catch (err) {
    entry[params.ops.target] = entry[params.ops.target]
  }

  if (entry === "{}") return null;
  else return entry[params.ops.target]
};