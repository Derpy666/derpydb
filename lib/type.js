const get = require("lodash.get");

function parse(value) {
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

  if (!entry) return null;
  if(params.ops.target == undefined) return null

  entry[params.ops.target] = parse(entry[params.ops.target])

  if (params.ops.target) entry = get(entry, params.ops.target);

  return Array.isArray(entry) ? "array" : typeof entry;
};