const get = require("lodash.get");

module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);

  if (!entry) return null;

if (params.ops.target) {
entry = get(entry, params.ops.target);

if(entry.includes(",")) entry = entry.split(",")
} else {
let keys = Object.keys(entry);
keys.map((key, index) => {
if(entry[key].toString ().includes(",")) entry[key] = entry[key].toString().split(",")
return entry[key]
})

return entry
}
};
