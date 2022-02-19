const mysql = require('mysql2')
const connectionPool = mysql.createPool({
  host: 'ip',
  user: 'root',
  password: 'root',
  database: 'blogs_data',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = { connectionPool }