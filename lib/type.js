const get = require("lodash.get");

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
  if(params.ops.target == undefined) return null

  entry[params.ops.target] = parse(entry[params.ops.target])

  if (params.ops.target) entry = get(entry, params.ops.target);

  return Array.isArray(entry) ? "array" : typeof entry;
};