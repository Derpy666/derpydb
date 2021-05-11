# **DerpyDB**
# Basic code

```js
const Database = require('derpydb');
// SQlite
const db = new Database({ uri: 'sqlite://db.sqlite' });
// MySQL
const db = new Database({ uri: 'mysql://user:pass@host/dbname' });

```

### new Database([*options*])

- `options.uri`: specific uri to connect (default: `sqlite://db.sqlite`).

Creates a new database connection. 

```js
const db = new Database({ uri: "sqlite://db.sqlite" });
```

### .createTable([*options*])

Get the data from given id or id and target

- `options.table`: specific table name to create (default: `main`).

```js
db.createTable({ table: 'players' }); // true
```

### .get(*id*, [*options*])

Get the data from given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be get (default: `null`).

```js
// without target
const data = db.get('derpy', { table: 'info' }); // { name: "Derpy", age: 19 }
// with target
const data = db.get('derpy', { table: 'info', target: 'age' }); // 18
const data = db.get('derpy.age', { table: 'players' }); // 18
```

### .set(*id*, *value*, [*options*])

set new data to given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be set (default: `null`).

```js
db.set('derpy.age', 20, { table: 'info' }); // 20
```

### .has(*id*, [*options*])

find if the given id is exits

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to find (default: `null`).

```js
db.has('derpy.age', { table: 'info' }); // true
```

### .type(*id*, [*options*])

find the type of the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to find type (default: `null`).

```js
db.type('derpy.age', { table: 'info' }); // number
```

### .startsWith(*string*, [*options*])

find the list datas that starts with the given string

- `options.table`: specific table in the database (default: `null`).

```js
db.startsWith('der', { table: 'info' }); // [{ id: 'derpy', value: { name: "Derpy", age: 19 }}]
```

### .add(*id*, *number*, [*options*])

add number value to the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be added the number (default: `null`).

```js
db.add('derpy.age', 1, { table: 'info' }); // 20
```

### .remove(*id*, *number*, [*options*])

remove number value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be removed the number (default: `null`).

```js
db.remove('derpy.age', 1, { table: 'info' }); // 18
```

### .push(*id*, *value*, [*options*])

push new item value to the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be pushed in to (default: `null`).

```js
db.get('derpy.list', { table: 'info' }); // ['banana', 'grape']
db.push('derpy.list', 'apple', { table: 'info' }); // ['banana', 'grape', 'apple']
```

### .pull(*id*, *value*, [*options*])

pull item value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be pulled from it (default: `null`).

```js
db.get('derpy.list', { table: 'info' }); // ['banana', 'grape', 'apple']
db.pull('derpy.list', 'grape', { table: 'info' }); // ['banana', 'apple']
```

### .delete(*id*, [*options*])

delete value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be deleted from it (default: `null`).

```js
db.delete('derpy', { table: 'info' }); // true
```

### .all([*options*])

get list of databases in specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.all({ table: 'info' }); // [{ id: 'derpy', value: { name: 'Derpy', age: 19 }}]
```

### .deleteAll([*options*])

delete all the databases from specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.deleteAll({ table: 'info' }); // []
```

### .tables()

get the list of the tables you created

```js
db.tables(); // ['info']
```

### .deleteTable([*options*])

delete specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.deleteTable({ table: 'info' }); // true
```

### .getTable([*options*])

get specific table information

- `options.table`: specific table in the database (default: `null`).

```js
db.getTable({ table: 'info' }); // { table: 'info', id: 'TEXT', value: 'TEXT' }
```

### .db

run code through sqlite

```js
db.db.prepare('SELECT * FROM info WHERE id = (?)').get('derpy') 
```
