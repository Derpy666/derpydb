const Database = require("better-sqlite3");
const ejs = require("ejs")
let db;
if (!db) db = new Database('db.sqlite');

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
  deleteTable: require("./lib/deleteTable.js")
};

module.exports = {
  get: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("get", { id: key, ops: ops || {} });
  },

  set: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (!value && value != 0) throw new TypeError("No value specified.");
    return arbitrate("set", {
      stringify: true,
      id: key,
      data: value,
      ops: ops || {}
    });
  },

  has: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("has", { id: key, ops: ops || {} });
  },

  type: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("type", { id: key, ops: ops || {} });
  },

  startsWith: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("startsWith", { id: key, ops: ops || {} });
  },

  push: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (!value && value != 0)
      throw new TypeError("Must specify value to push.");
    return arbitrate("push", {
      stringify: true,
      id: key,
      data: value,
      ops: ops || {}
    });
  },

  add: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (isNaN(value)) throw new TypeError("Must specify value to add.");
    return arbitrate("add", { id: key, data: value, ops: ops || {} });
  },

  remove: function(key, value, ops) {
    if (!key) throw new TypeError("No key specified.");
    if (isNaN(value)) throw new TypeError("Must specify value to remove.");
    return arbitrate("remove", { id: key, data: value, ops: ops || {} });
  },

  delete: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("delete", { id: key, ops: ops || {} });
  },

  getAll: function(ops) {
    return arbitrate("getAll", { ops: ops || {} });
  },

  deleteAll: function(ops) {
    return arbitrate("deleteAll", { ops: ops || {} });
  },

  tables: function(ops) {
    return arbitrate("tables", { ops: ops || {} });
  },

  deleteTable: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("deleteTable", { table: key, ops: ops || {} });
  },

  website: function(password, port) {
    const express = require("express");
    const db = require("./index.js");
    const path = require("path");
    const { inspect } = require("util");

if(!port) port = 3000
      const app = express();

      const listener = app.listen(port, () =>
        console.log("Your app is listening on port " + listener.address().port)
      );

app
  .use(require("express").static("public"))
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"));

app
  .use("/api/table", require("./api/table"))
  .use("/api/action_delete", require("./api/action/delete"))
  .use("/api/action_edit", require("./api/action/edit"))
  .use("/api/password", require("./api/password"));

    app.get("/derpyDB/data", (req, res) => {
  if (req.query) {
    if (req.query.password) {
      if (req.query.password == password) {
        res.render("db", { db, inspect, table: req.query.table || "main", password });
      } else {
        res.redirect("/derpyDB/login");
      }
    } else {
      res.redirect("/derpyDB/login");
    }
  } else {
    res.redirect("/derpyDB/login");
  }
    });

    app.get("/derpyDB/login", (req, res) => res.render("loginDB", { db, inspect, password }));
  },

  version: require("./package.json").version
};

function arbitrate(method, params) {
  let options = {
    table: params.ops.table || "main"
  };

  db.prepare(
    `CREATE TABLE IF NOT EXISTS ${options.table} (id TEXT, value TEXT)`
  ).run();

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
