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
const db = new Database('db.sqlite');
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
const data = db.get('derpy', { table: 'players' }); // { id: 'derpy', age: 18 }
// with target
const data = db.get('derpy', { table: 'players', target: 'age' }); // 18
const data = db.get('derpy.age', { table: 'players' }); // 18
```

### .set(*id*, *value*, [*options*])

set new data to given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be set (default: `null`).

```js
db.set('derpy.age', 18, { table: 'players' }); // 18
```

### .has(*id*, [*options*])

find if the given id is exits

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to find (default: `null`).

```js
db.has('derpy.age', { table: 'players' }); // true
```

### .type(*id*, [*options*])

find the type of the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to find type (default: `null`).

```js
db.type('derpy.age', { table: 'players' }); // number
```

### .startsWith(*string*, [*options*])

find the list datas that starts with the given string

- `options.table`: specific table in the database (default: `null`).

```js
db.startsWith('der', { table: 'players' }); // [{ id: 'derpy', age: 18}]
```

### .add(*id*, *number*, [*options*])

add number value to the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be added the number (default: `null`).

```js
db.add('derpy.age', 1, { table: 'players' }); // 19
```

### .remove(*id*, *number*, [*options*])

remove number value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be removed the number (default: `null`).

```js
db.remove('derpy.age', 1, { table: 'players' }); // 17
```

### .push(*id*, *value*, [*options*])

push new item value to the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be pushed in to (default: `null`).

```js
db.push('derpy.list', 'apple', { table: 'players' }); // ['banana', 'grape', 'apple']
```

### .pull(*id*, *value*, [*options*])

pull item value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be pulled from it (default: `null`).

```js
db.pull('derpy.list', 'grape', { table: 'players' }); // ['banana', 'apple']
```

### .delete(*id*, [*options*])

delete value from the given id

- `options.table`: specific table in the database (default: `null`).
- `options.target`: specific a target to be deleted from it (default: `null`).

```js
db.delete('derpy', { table: 'players' }); // true
```

### .all([*options*])

get list of databases in specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.all({ table: 'players' }); // [{ id: 'derpy', age: 18}]
```

### .deleteAll([*options*])

delete all the databases from specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.deleteAll({ table: 'players' }); // []
```

### .tables()

get the list of the tables you created

```js
db.tables(); // ['players']
```

### .deleteTable([*options*])

delete specific table

- `options.table`: specific table in the database (default: `null`).

```js
db.deleteTable({ table: 'players' }); // true
```

### .editTable(table, [*options*])

edit specific old table to new data

- `options.table`: specific table name to create (default: `main`).
- `options.whatyouwant`: here you can specific what you want: `age, lastname, fullname...`

```js
db.editTable('players'{ table: 'peoples', id: 'TEXT', value: 'INT' }); // true
```

### .getTable([*options*])

get specific table information

- `options.table`: specific table in the database (default: `null`).

```js
db.getTable({ table: 'players' }); // { table: 'players', id: 'TEXT', age: 'INT' }
```

### .db

run code through sqlite

```js
db.db.prepare('SELECT * FROM players WHERE id = (?)').get('derpy') 
```
