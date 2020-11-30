const get = require("lodash/get");

function parse(elm) {
    try {
    if(isNaN(elm) === false) {
    if(typeof elm === "number") return elm;
    else if (typeof elm === "object") return elm
    }
    elm = JSON.parse(elm)
    return parse(elm)
    }
    catch(e) {
    return elm
    }
    }

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

  if (!entry) return null;
  if(params.ops.target) {

params.ops.target = params.ops.target.split(".")

	entry = entry[params.ops.target[0]]

if(params.ops.target[0] !== "id") entry = parse(entry)

if(params.ops.target.length > 1) entry = get(entry, params.ops.target.slice(1).join("."))
}

  return Array.isArray(entry) ? "array" : typeof entry;
};
