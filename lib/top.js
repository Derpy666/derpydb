module.exports = function(db, params, options) {
  let entry = db
    .prepare(`SELECT * FROM ${options.table}`)
    .all();

  if(!entry) return null

  let top = db.prepare(`SELECT * FROM ${options.table} ORDER BY ${params.target} DESC LIMIT (?)`).all(params.num)

return top;
};
