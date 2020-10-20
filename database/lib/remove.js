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
    let oldValue = get(entry, params.ops.target);
    if (oldValue === undefined) oldValue = 0;
    else if (isNaN(oldValue)) throw new Error("Target is not a number.");
    params.data = set(entry, params.ops.target, oldValue - params.data);
  } else {
    if (entry.value === "{}") entry.value = 0;
    else entry.value = JSON.parse(entry.value);
    try {
      entry.value = JSON.parse(entry);
    } catch (e) {}
    if (isNaN(entry.value)) throw new Error("Target is not a number.");
    params.data = parseInt(entry.value, 10) - parseInt(params.data, 10);
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
