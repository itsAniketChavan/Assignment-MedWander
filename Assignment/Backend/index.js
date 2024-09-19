const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('./db');

const dbConnection = connection

var cors = require('cors')
 

app.use(cors())


// Enable JSON body parsing middleware
app.use(express.json());

app.post('/addSampleUsers', (req, res) => {
    try {
      // Extract name and email from the request body
      const {form_type, name, country_code, phone_no} = req.body;

      // Check if both name and email are provided
      if (!form_type || !name || !country_code || !phone_no) {
        return res.status(400).json({ message: 'form_Type, Name and email are required' });
      }

      // Define the SQL query to insert dynamic data
      const sqlQuery = `
        INSERT INTO users (form_type, name, country_code, phone_no) VALUES 
        (?, ?, ?, ?)
      `;

      // Execute the query with user-provided data
      const result = dbConnection.query(sqlQuery, [form_type, name, country_code, phone_no]);

      // Send a success response
      res.status(200).json({
        message: 'Sample user added successfully!',
         
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting sample data' });
    }
});



app.get('/getAllUsers', (req, res) => {
  try {
      // Define the SQL query to retrieve all users
      const sqlQuery = 'SELECT * FROM users';

      // Execute the query
      dbConnection.query(sqlQuery, (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Error retrieving users data' });
          }

          // Send the result as a response
          res.status(200).json({
              message: 'Users retrieved successfully!',
              users: results
          });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving users data' });
  }
});



// Data-synchronizing.....
const { synchronizing } = require('./spreadsheet'); // Import the Google Sheets service
// const connection = require('./db');
// Route to fetch Google Sheets data
app.post('/data-synchronizing', async (req, res) => {
    try {
        const result = await synchronizing(); // Wait for the spreadsheet data

         
        return res.status(200).json({result });
         
         
    
    } catch (error) {
        // Handle error and respond with a 500 status code
        res.status(500).json({ message: 'Error fetching spreadsheet data', error: error.message });
    }
});

 
// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

