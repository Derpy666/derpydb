const set = require("lodash/set");
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

params.ops.target = params.ops.target.split(".").filter(x => x !== "")

let callum = params.ops.target[0]

if(!entry[callum]) entry[callum] = {}

if(callum == "id") return null

entry[callum] = parse(entry[callum])

if (typeof entry[callum] === 'object' && params.ops.target.length > 1) {
    if(isNaN(params.data)) params.data = parse(params.data);
    params.data = set(entry[callum], params.ops.target.slice(1).join("."), params.data);
  }

    if(isNaN(params.data) || Array.isArray(params.data)) {
        params.data = JSON.stringify(params.data)
    }

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target[0]} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );

  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id)
    
    if(isNaN(entry[callum])) entry[callum] = parse(entry[callum])

    if(params.ops.target.length > 1) entry = get(entry[callum], params.ops.target.slice(1).join("."))
    else entry = entry[callum]

   return entry
};
