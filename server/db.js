const Pool = require('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:'28lenya09cher03',
    host:'localhost',
    port: 5432,
    database:"inventory"

});

module.exports = pool