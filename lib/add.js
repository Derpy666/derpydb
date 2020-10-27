const get = require("lodash.get");
const set = require("lodash.set");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (ID) VALUES (?)`).run(
      params.id
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

  if (params.ops.target == undefined) return null
    let oldValue = get(entry, params.ops.target);
    if (oldValue === undefined) oldValue = 0;
    else if (isNaN(oldValue))
      throw new Error(
        `Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${entry}\nEXPECTED: number`
      );

    if (isNaN(entry[params.ops.target]))
      throw new Error(
        `Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${entry}\nEXPECTED: number`
      );
    params.data = parseInt(entry[params.ops.target], 10) + parseInt(params.data, 10);

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );
  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (entry === "{}") return null;
  else return entry[params.ops.target]
};
