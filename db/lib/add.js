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
    let oldValue = get(entry, params.ops.target);
    if (oldValue === undefined) oldValue = 0;
    else if (isNaN(oldValue))
      throw new Error(
        `Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${entry}\nEXPECTED: number`
      );
    params.data = set(entry, params.ops.target, oldValue + params.data);
  } else {
    if (entry.value === "{}") entry.value = 0;
    else entry.value = JSON.parse(entry.value);
    try {
      entry = JSON.parse(entry);
    } catch (e) {}
    if (isNaN(entry))
      throw new Error(
        `Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${entry}\nEXPECTED: number`
      );
    params.data = parseInt(entry, 10) + parseInt(params.data, 10);
  }

  params.data = JSON.stringify(params.data);

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );
  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

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
