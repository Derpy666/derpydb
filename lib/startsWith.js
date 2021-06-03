module.exports = function(db, params, options) {
  let entry = db.run(`SELECT * FROM ${options.table}`)

  entry = entry.map(item => {
    item.value = JSON.parse(item.value)
    return item
  })

  return entry.filter(ent => ent.id.startsWith(params.id));
};
