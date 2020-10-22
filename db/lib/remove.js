const get = require("lodash.get");
const set = require("lodash.set");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (id) VALUES (?)`).run(
      params.id
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }


if(params.ops.target == undefined) return null

    let oldValue = get(entry, params.ops.target);
    if (oldValue === undefined) oldValue = 0;
    else if (isNaN(oldValue)) throw new Error("Target is not a number.");
    params.data = set(entry, params.ops.target, oldValue - params.data);
 
    if (isNaN(entry[params.ops.target])) throw new Error("Target is not a number.");
    params.data = parseInt(entry[params.ops.target], 10) - parseInt(params.data, 10);

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (entry === "{}") return null;
  else return entry[params.ops.target]
};
