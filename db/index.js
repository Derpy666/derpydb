module.exports = (bot, db) => {
let methods = {
all: require("./lib/all")
}

return {

all: function(ops) {
    return arbitrate("all", { ops: ops || {} });
  },

version:"0.0.1"
}

function arbitrate(method, params) {
  let options = {
    table: params.ops.table || "main"
  };

  db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (id TEXT, value TEXT)`).run();

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);
  if (params.data && params.data === Infinity)
    throw new TypeError(
      `You cannot set Infinity into the database @ ID: ${params.id}`
    );

  if (params.stringify) {
    try {
      params.data = JSON.stringify(params.data);
    } catch (e) {
      throw new TypeError(
        `Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`
      );
    }
  }

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }

  return methods[method](db, params, options);
}
}

