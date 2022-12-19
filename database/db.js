const Pool = require('pg').Pool;
const pool = new Pool({
    User: "postgres",
    password: "1qwe45tyu8",
    host: "localhost",
    port: '5432',
    database: 'notebook1'
})

module.exports = pool;