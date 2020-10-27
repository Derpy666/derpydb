module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

entry.map(item => {
let keys = Object.keys(item);
keys.map((key, index) => {
if(item[key].toString().includes(",")) item[key] = item[key].toString().split(",")
})
return item
})

  return entry;
};
