const get = require("lodash.get");
const set = require("lodash.set");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (ID,${params.ops.target}) VALUES (?,?)`).run(
      params.id,
      "{}"
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

  if (params.ops.target) {
    delete entry.id
    entry = JSON.parse(entry);
    try {
      entry = JSON.parse(entry);
    } catch (e) {}
    params.data = JSON.parse(params.data);
    if (typeof entry !== "object")
      throw new TypeError("Cannot push into a non-object.");
    let oldArray = get(entry, params.ops.target);
    if (oldArray === undefined) oldArray = [];
    else if (!Array.isArray(oldArray))
      throw new TypeError("Target is not an array.");
    oldArray.push(params.data);
    params.data = set(entry, params.ops.target, oldArray);
  } else {
    if (entry === "{}") entry = [];
    else entry = JSON.parse(entry);
    try {
      entry = JSON.parse(entry);
    } catch (e) {}
    params.data = JSON.parse(params.data);
    if (!Array.isArray(entry))
      throw new TypeError("Target is not an array.");
    entry.push(params.data);
    params.data = entry;
  }

  params.data = JSON.stringify(params.data);

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);
delete entry.id
  if (entry === "{}") return null;
  else {
    entry = JSON.parse(entry);
    try {
      entry = JSON.parse(entry);
    } catch (e) {}
    return entry;
  }
};
