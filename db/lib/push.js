const get = require("lodash.get");
const set = require("lodash.set");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (ID,value) VALUES (?,?)`).run(
      params.id,
      "{}"
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

  if (params.ops.target) {
    entry = JSON.parse(entry.value);
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
    if (entry.value === "{}") entry.value = [];
    else entry.value = JSON.parse(entry.value);
    try {
      entry.value = JSON.parse(entry.value);
    } catch (e) {}
    params.data = JSON.parse(params.data);
    if (!Array.isArray(entry.value))
      throw new TypeError("Target is not an array.");
    entry.value.push(params.data);
    params.data = entry.value;
  }

  params.data = JSON.stringify(params.data);

  db.prepare(`UPDATE ${options.table} SET value = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id).value;
  if (entry === "{}") return null;
  else {
    entry = JSON.parse(entry);
    try {
      entry = JSON.parse(entry);
    } catch (e) {}
    return entry;
  }
};
