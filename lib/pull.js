const get = require("lodash.get");
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

if(!entry[params.ops.target]) entry[params.ops.target] = []

entry[params.ops.target] = parse(entry[params.ops.target])

    if (typeof entry[params.ops.target] !== "object")
      throw new TypeError("Cannot pull from a non-object.");
    let oldArray = entry[params.ops.target]
    if (!Array.isArray(oldArray))
      throw new TypeError("Target is not an array.");
    oldArray = oldArray.filter(item => item !== params.data);
    params.data = set(entry, params.ops.target, oldArray)

    if(isNaN(entry[params.ops.target])) entry[params.ops.target] = JSON.stringify(entry[params.ops.target])

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target} = (?) WHERE ID = (?)`).run(
    params.data[params.ops.target],
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

    entry[params.ops.target] = parse(entry[params.ops.target])

  if (entry[params.ops.target] === "{}") return null;
    return entry[params.ops.target];
};