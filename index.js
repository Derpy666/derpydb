let methods = {
  get: require("./lib/get.js"),
  set: require("./lib/set.js"),
  has: require("./lib/has.js"),
  type: require("./lib/type.js"),
  startsWith: require("./lib/startsWith.js"),
  add: require("./lib/add.js"),
  remove: require("./lib/remove.js"),
  push: require("./lib/push.js"),
  pull: require("./lib/pull.js"),
  delete: require("./lib/delete.js"),
  getAll: require("./lib/getAll.js"),
  deleteAll: require("./lib/deleteAll.js"),
  import: require("./lib/import.js"),
  tables: require("./lib/tables.js"),
  getTable: require("./lib/getTable.js"),
  deleteTable: require("./lib/deleteTable.js"),
  createTable: require("./lib/createTable.js")
};

function arbitrate(method, params) {

let options;
if(!params) params = {}
if(!params.ops) params.ops = {}

  options = {
    table: params.ops.table || "main"
  };

let DB = params.db
let adapter = params.adapter

let db = {
run: function(code) {
if(adapter == "sqlite") {
if(code.startsWith("create table") || code.startsWith("CREATE TABLE")) return DB.prepare(code).run()
else if(code.startsWith("select") || code.startsWith("SELECT")) {
if(code.includes("where") || code.includes("WHERE")) return DB.prepare(code).get()
else return DB.prepare(code).all()
} else if(code.startsWith("insert into") || code.startsWith("INSERT INTO")) return DB.prepare(code).run()
else if(code.startsWith("update") || code.startsWith("UPDATE")) return DB.prepare(code).run()
else return DB.prepare(code).run()
}

if(adapter == "mysql") {
if(code.startsWith("create table") || code.startsWith("CREATE TABLE")) return DB.query(code)
else if(code.startsWith("select") || code.startsWith("SELECT")) {
if(code.includes("where") || code.includes("WHERE")) return DB.query(code)[0]
else return DB.query(code)
}
else if(code.startsWith("insert into") || code.startsWith("INSERT INTO")) return DB.query(code)
else if(code.startsWith("update") || code.startsWith("UPDATE")) return DB.query(code)
else return DB.query(code)
}
}
}

db.run(`CREATE TABLE IF NOT EXISTS ${options.table} (id TEXT, value TEXT)`)

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }

return methods[method](db, params, options);

}

let functions = (db, adapter) => {
return Object({
  createTable: function(ops = {}) {
    return arbitrate("createTable", { ops, db, adapter });
  },
  
  get: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("get", { id: key, ops, db, adapter });
  },

  fetch: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("get", { id: key, ops, db, adapter });
  },

  set: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value && value != 0) throw new TypeError("You must provide a value to set.");
    return arbitrate("set", {
      stringify: true,
      id: key,
      data: value,
      ops, db, adapter
    });
  },

  has: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("has", { id: key, ops, db, adapter });
  },

  type: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("type", { id: key, ops, db, adapter });
  },

  startsWith: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("startsWith", { id: key, ops, db, adapter });
  },

  add: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (isNaN(value)) throw new TypeError("You must provide a value to add.");
    return arbitrate("add", { id: key, data: value, ops, db, adapter });
  },

  remove: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (isNaN(value)) throw new TypeError("You must provide a value to remove.");
    return arbitrate("remove", { id: key, data: value, ops, db, adapter });
  },

  subtract: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (isNaN(value)) throw new TypeError("You must provide a value to remove.");
    return arbitrate("remove", { id: key, data: value, ops, db, adapter });
  },

  push: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value) throw new TypeError("You must provide value to push.");
    return arbitrate("push", { id: key, data: value, ops, db, adapter });
  },

  pull: function(key, value, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value) throw new TypeError("You must provide value to pull.");
    return arbitrate("pull", { id: key, data: value, ops, db, adapter });
  },

  delete: function(key, ops = {}) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("delete", { id: key, ops, db, adapter });
  },

  getAll: function(ops = {}) {
    return arbitrate("getAll", { ops, db, adapter });
  },

  all: function(ops = {}) {
    return arbitrate("getAll", { ops, db, adapter });
  },

  fetchAll: function(ops = {}) {
    return arbitrate("getAll", { ops, db, adapter });
  },

  deleteAll: function(ops = {}) {
    return arbitrate("deleteAll", { ops, db, adapter });
  },

  import: function(ops = {}) {
    if(!ops.from) throw new TypeError("You must use 'from' option (uri value).");
    if(!ops.to) throw new TypeError("You must use 'to' option (uri value).");
    return arbitrate("import", { ops, db, adapter });
  },

  tables: function() {
    return arbitrate("tables", { db, adapter });
  },

  deleteTable: function(ops = {}) {
    return arbitrate("deleteTable", { ops, db, adapter });
  },

  getTable: function(ops = {}) {
    return arbitrate("getTable", { ops, db, adapter });
  },
  db,
  version: '1.0.0'
})
}

class Database {
constructor(ops = {}) {
    
    if(!ops.uri) ops.uri = "sqlite://db.sqlite"

let params = String(ops.uri).split("://")

let adapter = params[0]

switch(adapter) {
case "mysql":

const MYSQL = require("sync-mysql")

let user = params[1].split(":")[0]
let part = params[1].split(`${user}:`)[1]
let host = part.split("/")[0].split("@").reverse()[0]
let password = part.split(`@${host}`)[0]
let database = part.split("/")[1]

let mysql_db = new MYSQL({ host, user, password, database })

mysql_db.options = { host, user, password, database, uri: ops.uri }

return functions(mysql_db, adapter)

break;
case "sqlite":

const SQLITE = require("better-sqlite3")

let sqlite_db = new SQLITE(params[1])

return functions(sqlite_db, adapter)

break;
default:

throw Error("no such adapter inserted")

}

}

}

module.exports = Database
