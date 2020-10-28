const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

  if (params.ops.target) {
entry = entry[params.ops.target]

if(String(entry).includes(",")) entry = entry.split(",")
return entry
} else {
let keys = Object.keys(entry);
keys.map((key, index) => {
if(String(entry[key]).includes(",")) entry[key] = String(entry[key]).split(",")
return entry[key]
})

return entry
}
};
