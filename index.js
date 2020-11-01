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
  pull: require("./lib/pull.js"),
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
  createTable: function(ops) {
    return arbitrate("createTable", { ops: ops || {}, db: db});
  },
  
  get: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("get", { id: key, ops: ops || {},db:db });
  },

  fetch: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("get", { id: key, ops: ops || {},db:db });
  },

  set: function(key, value, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value && value != 0) throw new TypeError("You must provide a value to set.");
    return arbitrate("set", {
      stringify: true,
      id: key,
      data: value,
      ops: ops || {}, db:db
    });
  },

  has: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("has", { id: key, ops: ops || {}, db: db });
  },

  type: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("type", { id: key, ops: ops || {}, db: db });
  },

  startsWith: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    return arbitrate("startsWith", { id: key, ops: ops || {}, db:db });
  },

  add: function(key, value, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    if (isNaN(value)) throw new TypeError("You must provide a value to add.");
    return arbitrate("add", { id: key, data: value, ops: ops || {}, db: db });
  },

  remove: function(key, value, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    if (isNaN(value)) throw new TypeError("You must provide a value to remove.");
    return arbitrate("remove", { id: key, data: value, ops: ops || {}, db: db });
  },

  push: function(key, value, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value) throw new TypeError("You must provide value to push.");
    return arbitrate("push", { id: key, data: value, ops: ops || {}, db: db });
  },

  pull: function(key, value, ops) {
    if (!key) throw new TypeError("You must provide a key.");
    if (!value) throw new TypeError("You must provide value to pull.");
    return arbitrate("pull", { id: key, data: value, ops: ops || {}, db: db });
  },

  delete: function(key, ops) {
    if (!key) throw new TypeError("You must provide a key.");
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

  tables: function() {
    return arbitrate("tables", { db: db });
  },

  deleteTable: function(ops) {
    return arbitrate("deleteTable", { ops: ops || {} , db: db});
  },

  getTable: function(ops) {
    return arbitrate("getTable", { ops: ops || {} , db: db});
  },

  top: function(target, num, ops) {
    if (!target) throw new TypeError("You must provide target top.");
    if (!num) throw new TypeError("You must provide a top number.");
    return arbitrate("top", { target: target, num: num, ops: ops || {} , db: db});
  },

  db: db
}

Object.keys(functions).map(x => this[x] = functions[x])

}

function arbitrate(method, params) {

let options;

  if(params.ops) {
  options = {
    table: params.ops.table
  };

  if(options.table == undefined) throw ReferenceError("You must provide a table")

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }
}

let db = params.db

return methods[method](db, params, options);

}
