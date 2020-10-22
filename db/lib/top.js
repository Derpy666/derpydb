module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

  if(!entry) return null

  let top = db.prepare(`SELECT * FROM ${options.table} ORDER BY (?) DESC LIMIT (?)`).all(params.target, params.num)

return top;
};
