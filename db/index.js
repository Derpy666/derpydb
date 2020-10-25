let Database = require("better-sqlite3")

//let db;

//if(!db) db = Database("db.sqlite")

var methods = {
  get: require("./lib/get.js"),
  set: require("./lib/set.js"),
  has: require("./lib/has.js"),
  type: require("./lib/type.js"),
  startsWith: require("./lib/startsWith.js"),
  push: require("./lib/push.js"),
  add: require("./lib/add.js"),
  remove: require("./lib/remove.js"),
  delete: require("./lib/delete.js"),
  getAll: require("./lib/getAll.js"),
  deleteAll: require("./lib/deleteAll.js"),
  tables: require("./lib/tables.js"),
  top: require("./lib/top.js"),
  backup: require("./lib/backup.js"),
  backups: require("./lib/backups.js"),
  download: require("./lib/download.js"),
  load: require("./lib/load.js"),
  use: require("./lib/use.js"),
  getTable: require("./lib/getTable.js"),
  deleteTable: require("./lib/deleteTable.js"),
  createTable: require("./lib/createTable.js")
};

module.exports = function(path) {
if(!path) return null
let db = require("better-sqlite3")(path)

let functions = {
  get: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("get", { id: key, ops: ops || {},db:db });
  },

  fetch: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("get", { id: key, ops: ops || {},db:db });
  },

  set: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (!value && value != 0) throw new TypeError("No value specified.");
    return arbitrate("set", {
      stringify: true,
      id: key,
      data: value,
      ops: ops || {}, db:db
    });
  },

  has: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("has", { id: key, ops: ops || {}, db: db });
  },

  type: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("type", { id: key, ops: ops || {}, db: db });
  },

  startsWith: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("startsWith", { id: key, ops: ops || {}, db:db });
  },

  push: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (!value && value != 0)
      throw new TypeError("Must specify value to push.");
    return arbitrate("push", {
      stringify: true,
      id: key,
      data: value,
      ops: ops || {}, db: db
    });
  },

  add: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (isNaN(value)) throw new TypeError("Must specify value to add.");
    return arbitrate("add", { id: key, data: value, ops: ops || {}, db: db });
  },

  remove: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (isNaN(value)) throw new TypeError("Must specify value to remove.");
    return arbitrate("remove", { id: key, data: value, ops: ops || {}, db: db });
  },

  delete: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("delete", { id: key, ops: ops || {}, db: db });
  },

  getAll: function(ops) {
    return arbitrate("getAll", { ops: ops || {}, db: db });
  },

  all: function(ops) {
    return arbitrate("getAll", { ops: ops || {} });
  },

  fetchAll: function(ops) {
    return arbitrate("getAll", { ops: ops || {}, db: db });
  },

  deleteAll: function(ops) {
    return arbitrate("deleteAll", { ops: ops || {}, db: db });
  },

  tables: function(ops) {
    return arbitrate("tables", { ops: ops || {}, db: db });
  },

  use: function(path, ops) {
    if (!path) throw new TypeError("No path specified.");
    return arbitrate("use", { path: path, ops: ops || {},db:db });
  },

  backup: function(ops) {
    return arbitrate("backup", { ops: ops || {}, db: db });
  },

  backups: function(ops) {
    return arbitrate("backups", { ops: ops || {}, db: db });
  },

  download: function(date, ops) {
  if(!date) throw new TypeError("No date specified. (DD-MM-HH-MM-SS)");
    return arbitrate("download", { date: date, ops: ops || {}, db: db });
  },

  load: function(date, ops) {
  if(!date) throw new TypeError("No date specified. (DD-MM-HH-MM-SS)");
    return arbitrate("load", { date: date, ops: ops || {}, db: db });
  },

  top: function(target, num, ops) {
    if (!target) throw new TypeError("No target top specified.");
    if (!num) throw new TypeError("No top number specified.");
    return arbitrate("top", { target: target, num: num, ops: ops || {} , db: db});
  },

  deleteTable: function(ops) {
    return arbitrate("deleteTable", { ops: ops || {} , db: db});
  },

  getTable: function(ops) {
    return arbitrate("getTable", { ops: ops || {} , db: db});
  },

  createTable: function(ops) {
    return arbitrate("createTable", { ops: ops || {}, db: db});
  }
}

Object.keys(functions).map(x => this[x] = functions[x])

}

function arbitrate(method, params) {
  let options = {
    table: params.ops.table || "main"
  };

let db = params.db || require("better-sqlite3")("db.sqlite")

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }

  return methods[method](db, params, options);
}
