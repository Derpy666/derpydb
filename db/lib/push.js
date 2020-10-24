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

  if(!params.ops.target) return null

    if (typeof entry[params.ops.target] !== "object")
      throw new TypeError("Cannot push into a non-object.");
    let oldArray = entry[params.ops.target]
    if (oldArray === null) {
    db.prepare(`INSERT INTO ${options.table} (${params.ops.target}) VALUES (?)`).run([])

    oldArray = db.prepare(`SELECT * FROM ${options.table} WHERE id = (?)`).get(params.id)[params.ops.target]
    } else if (!Array.isArray(oldArray))
      throw new TypeError("Target is not an array.");
    oldArray.push(params.data);
    params.data = set(entry, params.ops.target, oldArray)

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data[params.ops.target],
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (entry[params.ops.target] === "{}") return null;
    return entry;
};
