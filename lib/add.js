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
    db.prepare(`INSERT INTO ${options.table} (ID) VALUES (?)`).run(
      params.id
    );
    entry = db
      .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
      .get(params.id);
  }

  if (params.ops.target == undefined) return null

params.ops.target = params.ops.target.split(".").filter(x => x !== "")

let callum = params.ops.target[0]

if(params.ops.target.length > 1) {

if(!entry[callum]) entry[callum] = {}

entry[callum] = parse(entry[callum])

let oldValue = get(entry[callum], params.ops.target.slice(1).join("."))
if (!oldValue) oldValue = 0;
else if (isNaN(oldValue))
      throw new Error(
        `Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${oldValue}\nEXPECTED: number`
      );

params.data = set(entry[callum], params.ops.target.slice(1).join("."), Number(oldValue) + Number(params.data))
} else {
	if(!entry[callum]) entry[callum] = 0
    entry[callum] = parse(entry[callum])
    if (isNaN(entry[callum])) throw new Error(`Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${entry[callum]}\nEXPECTED: number`);
    params.data = Number(entry[callum]) + Number(params.data)

}

params.data = JSON.stringify(params.data)

  db.prepare(`UPDATE ${options.table} SET ${params.ops.target[0]} = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );
  entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE id = (?)`)
    .get(params.id);

if (entry === "{}") return null;
else {
entry[callum] = parse(entry[callum])
if(params.ops.target.length > 1) return get(entry[callum], params.ops.target.slice(1).join("."))
else return entry[callum]
}

};
