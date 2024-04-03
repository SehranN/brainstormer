const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Somsoc1retupmoc',
  database: 'brainstormer',
});

module.exports = pool;