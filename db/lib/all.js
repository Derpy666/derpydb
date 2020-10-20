module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID IS NOT NULL`)
    .all();

  for (var i = 0; i < entry.length; i++) {
    entry[i].value =
      typeof JSON.parse(entry[i].value) == "string"
        ? JSON.parse(JSON.parse(entry[i].value))
        : JSON.parse(entry[i].value);
  }

  return entry;
};
