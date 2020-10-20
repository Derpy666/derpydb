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

  entry = JSON.parse(entry.value);

  try {
    entry = JSON.parse(entry);
  } catch (e) {}

  if (typeof entry === "object" && params.ops.target) {
    params.data = JSON.parse(params.data);
    params.data = set(entry, params.ops.target, params.data);
  } else if (params.ops.target)
    throw new TypeError("Cannot target a non-object.");

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
