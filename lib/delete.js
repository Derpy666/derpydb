const unset = require("lodash/unset");

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

  if (!entry) return false;

    if(params.ops.target) {

params.ops.target = params.ops.target.split(".")

let callum = params.ops.target[0]

if(!entry[callum]) entry[callum] = {}

if(callum == "id") return false

entry[callum] = parse(entry[callum])

if (typeof entry[callum] === 'object' && params.ops.target.length > 1) {
    unset(entry[callum], params.ops.target.slice(1).join("."));

    if(isNaN(entry[callum]) || Array.isArray(entry[callum])) {
        entry[callum] = JSON.stringify(entry[callum])
    }

    db.prepare(`UPDATE ${options.table} SET ${params.ops.target[0]} = (?) WHERE ID = (?)`).run(entry[callum], params.id);
  } else db.prepare(`UPDATE ${options.table} SET ${params.ops.target[0]} = (?) WHERE ID = (?)`).run(null, params.id);
    } else db.prepare(`DELETE FROM ${options.table} WHERE ID = (?)`).run(params.id)

  return true;
};
