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

function checkDB(db) {

try {
db.db.query("test")
} catch (e) {
if(e.code == "ENOTFOUND") throw `Invaild Database inserted (${db.db.name ? db.db.name : db.db.options.uri })`
}

}

module.exports = function(db, params, options) {
  
const Database = require("../index")

let oldDB = new Database({ uri: params.ops.from })

let newDB = new Database({ uri: params.ops.to })

checkDB(oldDB)
checkDB(newDB)

if(db.name == "json.sqlite") {

let all = oldDB.prepare("select * from json").all();
all = all.map((data,i) => {
const obj = {}
obj.id = data.ID;
obj.value = JSON.parse(data.json)

try {
obj.value = JSON.parse(obj.value)
console.log(`(${i+1}/${all.length}) entries left of table json (1/1)`);
} catch(e) {

}
return obj
})
return all.map(a => newDB.set(a.id, a.value))

} else {

oldDB.tables().map((table, index) => {
let c;
let all;
if(oldDB.db.prepare) {
c = oldDB.db.prepare(`PRAGMA table_info(${table})`).all().map(x => x.name)
all = oldDB.db.prepare(`SELECT * FROM ${table}`).all()
} else if(oldDB.db.query) {
c = oldDB.db.query(`SHOW COLUMNS FROM ${table}`).map(x => x.Field)
all = oldDB.db.query(`SELECT * FROM ${table}`)
}

all = all.filter(x => x[c[1]] && (x[c[1]] !== "undefined" || x[c[1]] !== "{}"))

return all.map((entry,i) => {
if(table == "json") table = "main"
try {
newDB.set(entry[c[0]], parse(entry[c[1]]), { table })
console.log(`(${i+1}/${all.length}) entries left of table ${table} (${oldDB.tables().indexOf(table) + 1}/${oldDB.tables().length})`);
if(i == (all.length - 1)) console.log(`Table: ${table} done (${oldDB.tables().indexOf(table) + 1}/${oldDB.tables().length} tables left)`);
} catch (e) {
}
})
if(index == (oldDB.tables().length - 1)) {
console.log(`Database finished to moved`)
}
})

}

return true

};
