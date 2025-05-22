const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8780303',
  password: 'YH9Zr5shQF',
  database: 'sql8780303'
});

module.exports = db;

