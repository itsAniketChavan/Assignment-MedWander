const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db');

// Call the DB connection when starting the server
const dbConnection = connectDB(); 


app.post('/addSampleUsers', async (req, res) => {
    try {
      // Define the SQL query to insert sample data
      const sqlQuery = `
        INSERT INTO users (name, email) VALUES 
        ('Alice Johnson', 'alice@example.com')
      `;
  
      // Execute the query
      const result = dbConnection.query(sqlQuery);
    
      // Send a success response
      res.status(200).json({
        message: 'Sample users added successfully!',
        // affectedRows: result.affectedRows // Number of rows affected
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting sample data' });
    }
  });
  



app.get('/', (req, res) => {
    return res.status(200).json("welcome")
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
