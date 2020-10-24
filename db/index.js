/*

let Database = require("better-sqlite3")

let db;

if(!db) db = Database("db.sqlite")

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
  getTable: require("./lib/getTable.js"),
  deleteTable: require("./lib/deleteTable.js"),
  createTable: require("./lib/createTable.js")
};

module.exports = {
  get: function(key, ops) {
    if (!key) throw new TypeError("No key specified.");
    return arbitrate("get", { id: key, ops: ops || {} });
  },

  fetch: function(key, ops) {
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

  all: function(ops) {
    return arbitrate("getAll", { ops: ops || {} });
  },

  fetchAll: function(ops) {
    return arbitrate("getAll", { ops: ops || {} });
  },

  deleteAll: function(ops) {
    return arbitrate("deleteAll", { ops: ops || {} });
  },

  tables: function(ops) {
    return arbitrate("tables", { ops: ops || {} });
  },

  backup: function(ops) {
    return arbitrate("backup", { ops: ops || {} });
  },

  backups: function(ops) {
    return arbitrate("backups", { ops: ops || {} });
  },

  download: function(date, ops) {
  if(!date) throw new TypeError("No date specified. (DD-MM-HH-MM-SS)");
    return arbitrate("download", { date: date, ops: ops || {} });
  },

  load: function(date, ops) {
  if(!date) throw new TypeError("No date specified. (DD-MM-HH-MM-SS)");
    return arbitrate("load", { date: date, ops: ops || {} });
  },

  top: function(target, num, ops) {
    if (!target) throw new TypeError("No target top specified.");
    if (!num) throw new TypeError("No top number specified.");
    return arbitrate("top", { target: target, num: num, ops: ops || {} });
  },

  deleteTable: function(ops) {
    return arbitrate("deleteTable", { ops: ops || {} });
  },

  getTable: function(ops) {
    return arbitrate("getTable", { ops: ops || {} });
  },

  createTable: function(ops) {
    return arbitrate("createTable", { ops: ops || {} });
  },

  use: function(p, ops) {
    if(!p) throw new TypeError("No path specified.");
    db.close()
    db = new Database(p)
    this.db = db
    return db
  },

  Database: db,

  version: require("../package.json").version
};

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

  return methods[method](db, params, options);
}*/


// Require Database
const Database = require('better-sqlite3');
const util = require('util');
let db;

// Create Database Under Conditions
if (!db) db = new Database('db.sqlite');
const fs = require("fs")
// Declare Methods
let dboptions = {
  id: "id",
  value: "value",
  table: "main"
}
var methods = {
  fetch: require('./lib/get.js'),
  set: require('./lib/set.js'),
  add: require('./lib/add.js'),
  subtract: require('./lib/remove.js'),
  push: require('./lib/push.js'),
  delete: require('./lib/delete.js'),
  has: require('./lib/has.js'),
  all: require('./lib/all.js'),
  type: require('./lib/type')
};
module.exports = { 


  backup: function() {
    try {
      if(!fs.existsSync("./backups/")) {
        fs.mkdirSync("./backups")
      }
    } catch(e) {
      fs.mkdirSync("./backups")
    };

    const files = fs.readdirSync("./backups");
    let num = files.map(a => a === "db-backup.sqlite" ? 0 : isNaN(a.split("-").pop().split(".")[0]) ? undefined :  Number(a.split("-").pop().split(".")[0])).filter(a => a !== undefined).sort((a,b) => b-a)[0]+1;
    if(isNaN(num)) num = 0;
    fs.copyFile('./db.sqlite', `./backups/db-backup${num === 0 ? "" : `-${num}`}.sqlite`, (err) => {
      if (err) throw err;

    });
    
  },

  load: function(id) {
    try {
      if(!fs.existsSync(`./backups/db-backup${id === 0 ? "" : `-${id}`}.sqlite`)) {
        throw new Error("Backup doesnt exists.")
      }
    } catch(e) {
      throw new Error("Backup doesnt exists.")
    };

    db.close()
    fs.unlinkSync("./db.sqlite")
    fs.copyFile(`./backups/db-backup${id === 0 ? "" : `-${id}`}.sqlite`, `./db.sqlite`, (err) => {
      if (err) throw err;
    });
    db = new Database("./db.sqlite")
    
  },

  use: function(id) {
    if(id === "default" || id === "normal") {
      db.close();
      db = new Database("./db.sqlite");
    } else if(isNaN(id) === false){
    try {
      if(!fs.existsSync(`./backups/db-backup${id === 0 ? "" : `-${id}`}.sqlite`)) {
        throw new Error("Backup doesnt exists.")
      }
    } catch(e) {
      throw new Error("Backup doesnt exists.")
    };

    db.close()
    db = new Database(`./backups/db-backup${id === 0 ? "" : `-${id}`}.sqlite`)
  } else if(isNaN(id)) {
    db.close();
    db = new Database(id);
  }

  this.db = db;
  },

  options: function(ops = {}) {
    if(typeof ops === "object") {
      if(Array.isArray(ops)) ops = {}
    }
    if(typeof ops === "string") ops = {}

    if(typeof ops.id === "string") dboptions.id = ops.id;
    if(typeof ops.value === "string") dboptions.value = ops.value;
    if(typeof ops.table === "string") dboptions.table = ops.table;

  },

  
 /**
 * Package version. Community requested feature.
 * console.log(require('quick.db').version);
 */
  version: '7.0.0b22',
  
 /**
 * This function fetches data from a key in the database. (alias: .get())
 * @param {key} input any string as a key. Also allows for dot notation following the key.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {data} the data requested.
 */
  db: db,
  fetch: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  get: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  
 /**
 * This function sets new data based on a key in the database. 
 * @param {key} input any string as a key. Also allows for dot notation following the key.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {data} the updated data.
 */
  
  set: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (value === undefined) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  
 /**
 * This function adds a number to a key in the database. (If no existing number, it will add to 0)
 * @param {key} input any string as a key. Also allows for dot notation following the key.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {data} the updated data.
 */
  
  add: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('add', {id: key, data: value, ops: ops || {}});
  },
  
 /**
 * This function subtracts a number to a key in the database. (If no existing number, it will subtract from 0)
 * @param {key} input any string as a key. Also allows for dot notation following the key.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {data} the updated data.
 */
  
  subtract: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('subtract', {id: key, data: value, ops: ops || {}});
  },
  
  remove: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('subtract', {id: key, data: value, ops: ops || {}});
  },
  
 /**
 * This function will push into an array in the database based on the key. (If no existing array, it will create one)
 * @param {key} input any string as a key. Also allows for dot notation following the key.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {data} the updated data.
 */
  
  push: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  
  
 /**
  
 */
  
 /**
 * This function will delete an object (or property) in the database.
 * @param {key} input any string as a key. Also allows for dot notation following the key, this will delete the prop in the object.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {boolean} if it was a success or not.
 */
  
  delete: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('delete', {id: key, ops: ops || {}});
  },
  
 /**
 * This function returns a boolean indicating whether an element with the specified key exists or not.
 * @param {key} input any string as a key. Also allows for dot notation following the key, this will return if the prop exists or not.
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {boolean} if it exists.
 */
  
  has: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  
  includes: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  
 /**
 * This function fetches the entire active table
 * @param {options} [input={ target: null }] Any options to be added to the request.
 * @returns {boolean} if it exists.
 */
  
  all: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  },
  
  fetchAll: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  },
  
  getAll: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  },  
  
  
  /* 
  * Used to get the type of the value.
  */
  
  
  type: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('type', {id: key, ops: ops || {}});
  },
  
 /**
 * Using 'new' on this function creates a new instance of a table.
 * @param {name} input any string as the name of the table.
 * @param {options} options.
 */
  
  table: function(tableName, options = {}) {
  
    // Set Name
    if (typeof tableName !== 'string') throw new TypeError('Table name has to be a string. Need Help? Check out: discord.gg/plexidev');
    else if (tableName.includes(' ')) throw new TypeError('Table name cannot include spaces. Need Help? Check out: discord.gg/plexidev');
    this.tableName = tableName;
    
    // Methods
    this.fetch = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.get = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.set = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (!value && value != 0) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.add = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('add', {id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.subtract = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('subtract', {id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.remove = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('subtract', {id: key, data: value, ops: ops || {}}, this.tableName);
    }    
    
    this.push = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.delete = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('delete', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.has = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
    }
    
    this.includes = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
    }
    
    this.fetchAll = function(ops) { 
      return arbitrate('all', {ops: ops || {}}, this.tableName);
    }
    
    this.getAll = function(ops) { 
      return arbitrate('all', {ops: ops || {}}, this.tableName);
    }    
    
    this.all = function(ops) { 
      return arbitrate('all', {ops: ops || {}}, this.tableName);
    }
    
  }
  
}

function arbitrate(method, params, tableName) {
  
  // Configure Options
  let options = {
    table: tableName || params.ops.table || dboptions.table,
    value: params.ops.value || dboptions.value,
    id: params.ops.id || dboptions.id
  }
  
db.prepare(
    `CREATE TABLE IF NOT EXISTS ${options.table} (${options.id} TEXT, ${options.value} TEXT)`
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
