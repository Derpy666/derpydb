let Database = require("better-sqlite3")

let methods = {
  get: require("./lib/get.js"),
  set: require("./lib/set.js"),
  has: require("./lib/has.js"),
  type: require("./lib/type.js"),
  startsWith: require("./lib/startsWith.js"),
  add: require("./lib/add.js"),
  remove: require("./lib/remove.js"),
  push: require("./lib/push.js"),
  delete: require("./lib/delete.js"),
  getAll: require("./lib/getAll.js"),
  deleteAll: require("./lib/deleteAll.js"),
  tables: require("./lib/tables.js"),
  top: require("./lib/top.js"),
  getTable: require("./lib/getTable.js"),
  deleteTable: require("./lib/deleteTable.js"),
  createTable: require("./lib/createTable.js")
};

module.exports = function(path) {
if(!path) path = "db.sqlite"
let db = new Database(path)

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

  push: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (!value) throw new TypeError("Must specify value to remove.");
    return arbitrate("push", { id: key, data: value, ops: ops || {}, db: db });
  },

  delete: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("delete", { id: key, ops: ops || {}, db: db });
  },

  getAll: function(ops) {
    return arbitrate("getAll", { ops: ops || {}, db: db });
  },

  all: function(ops) {
    return arbitrate("getAll", { ops: ops || {}, db:db });
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

  db: db,

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

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }

let db = params.db

return methods[method](db, params, options);

}
