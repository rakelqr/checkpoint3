const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '8889',
    password: 'root',
    database: 'wild_db_quest',
});

module.exports = connection;