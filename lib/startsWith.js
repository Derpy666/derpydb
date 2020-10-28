module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

entry.map(item => {
let keys = Object.keys(item);
keys.map((key, index) => {
if(String(item[key]).includes(",")) item[key] = String(item[key]).split(",")
})
return item
})

  return entry.filter(ent => ent.id.startsWith(params.id));
};
