const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elders_explore',
});

// Attempt to get connection and handle potential errors
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('Database not found.');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied for user to database.');
    }
  }

  if (connection) {
    connection.release();
    console.log('MySQL DB Connection Established Successfully.');
  }
});

// Export the pool to be used elsewhere in the app
module.exports = pool;
