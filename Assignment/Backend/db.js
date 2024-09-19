
const mysql = require('mysql');

// Create and export the database connection
const connection = mysql.createConnection({
  host: process.env.Host,
  user: process.env.Database_user,
  password: process.env.Database_password,
  database: process.env.Database_name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Export the connection object for use in other files
module.exports = connection;
