const mysql = require('mysql');

// Create the connection function
function connectDB() {
  const con = mysql.createConnection({
    host: process.env.Host || "localhost",
    user: process.env.Database_user || "yourusername",
    password: process.env.Database_password || "yourpassword",
    database: process.env.Database_name || "yourdatabase" // Optional: Include the database name if needed
  });


  // Connect to the database
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
  });

  return con

  
}

module.exports = connectDB;
