function parse(elm) {
    try {
    if(isNaN(elm) === false) {
    if(typeof elm === "number") return elm;
return elm
   
    }
    elm = JSON.parse(elm)
    return parse(elm)
    }
    catch(e) {
    return elm
    }
    }

module.exports = function(db, params, options) {
  
const Database = require("../index")

let oldDB = new Database({ uri: params.ops.from })

let newDB = new Database({ uri: params.ops.to })

oldDB.tables().map(table => {
let c;
let all;
if(oldDB.db.prepare) {
c = oldDB.db.prepare(`PRAGMA table_info(${table})`).all().map(x => x.name)
all = oldDB.db.prepare(`SELECT * FROM ${table}`).all()
} else if(oldDB.db.query) {
c = oldDB.db.query(`SHOW COLUMNS FROM ${table}`).map(x => x.Field)
all = oldDB.db.query(`SELECT * FROM ${table}`)
}
return all.map(entry => {
if(table == "json") table = "main"
return newDB.set(entry[c[0]], parse(entry[c[1]]), { table })
})
})

return true


};
