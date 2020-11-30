const get = require("lodash/get");
const set = require("lodash/set");

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

  if (!entry) {
    db.prepare(`INSERT INTO ${options.table} (id) VALUES (?)`).run(
      params.id
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

if(params.ops.target == undefined) return null

params.ops.target = params.ops.target.split(".")

let callum = params.ops.target[0]

if(!entry[callum]) entry[callum] = {}

if(params.ops.target.length > 1) {

entry[callum] = parse(entry[callum])
params.data = parse(params.data)

    if (typeof entry[callum] !== "object")
      throw new TypeError("Cannot push into a non-object.");
    let oldArray = get(entry[callum], params.ops.target.slice(1).join("."))
    if(!oldArray) oldArray = []
    if (!Array.isArray(oldArray))
      throw new TypeError("Target is not an array.");
    oldArray.push(params.data);
    params.data = set(entry[callum], params.ops.target.slice(1).join("."), oldArray)
} else {
if (Object.keys(entry[callum]).length == 0) entry[callum] = [];
    entry[callum] = parse(entry[callum])
    params.data = parse(params.data)
    if (!Array.isArray(entry[callum])) throw new TypeError('Target is not an array.');
    entry[callum].push(params.data);
    params.data = entry[callum];

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
    .get(params.id);

if (entry[callum] === "{}") return null;
else {
entry[callum] = parse(entry[callum])
if(params.ops.target.length > 1) return get(entry[callum], params.ops.target.slice(1).join("."))
else return entry[callum]
}
};
