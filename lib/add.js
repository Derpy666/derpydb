const get = require("lodash/get");
const set = require("lodash/set");

module.exports = function(db, params, options) {

  let entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)

  if (!entry) {
    db.run(`INSERT INTO ${options.table} (id) VALUES ('${params.id}')`)
    entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)
  }

if(!entry.value) entry.value = "{}"

if (isNaN(params.data)) throw new Error("data is not an number");

if(params.ops.target) {
    entry.value = JSON.parse(entry.value)
    let oldValue = get(entry.value, params.ops.target);
    if (!oldValue) oldValue = 0;
    else if (isNaN(oldValue)) throw new Error(`Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${oldValue}\nEXPECTED: number`);
    params.data = set(entry.value, params.ops.target, oldValue + params.data);
    params.data = JSON.stringify(params.data)
} else {
if(entry.value == "{}") entry.value = "0"
    entry.value = JSON.parse(entry.value)
    if (isNaN(entry.value)) throw new Error('Target is not a number.');
    params.data = entry.value + params.data
    params.data = JSON.stringify(params.data)
}

    db.run(`UPDATE ${options.table} SET value = '${params.data}' WHERE id = '${params.id}'`)
  
    entry = db.run(`SELECT * FROM ${options.table} WHERE id = '${params.id}'`)


    return JSON.parse(entry.value)

};

