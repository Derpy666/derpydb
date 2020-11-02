const set = require("lodash.set");

function parse(value) {

if(!isNaN(value) && typeof value !== "number") return value

  try {
      value = JSON.parse(JSON.parse(JSON.parse(JSON.parse(value))))
  } catch (err) {
      try {
          value = JSON.parse(JSON.parse(JSON.parse(value)))
      } catch (err) {
          try {
              value = JSON.parse(JSON.parse(value))
          } catch (err) {
              try {
                  value = JSON.parse(value)
              } catch (err) {}
          }
      }
  }
  return value
}

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

function isBoolean(val) {
  return val === false || val === true;
}

    if(isNaN(params.data)) params.data = JSON.stringify(params.data)

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

    entry[params.ops.target] = parse(entry[params.ops.target])

  if (entry === "{}") return null;
  else return entry[params.ops.target]
};