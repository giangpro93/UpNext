const db = require('./knex_db');

const query = 
db.select('Entity.*')
    .from('Group')
    .leftJoin('Entity', function() {
        this.on('Group.id', '=', 'Entity.id')
    })
    .toSQL();

console.log(query);