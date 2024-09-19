const { google } = require('googleapis');
require('dotenv').config();  // Load .env variables
const connection = require('./db');

const dbConnection = connection


const clientEmail = process.env.client_email;
const privateKey = process.env.private_key;

// authenticate the service account
const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);


// const auth = new google.auth.GoogleAuth({
//     keyFile: './creds.json',  // Path to your service account key file.
//     scopes: ['https://www.googleapis.com/auth/spreadsheets']  // Scope for Google Sheets API.
// });

async function getSheetRowCount() {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1lNzfHAJMXRwaJWwqSDwdKZHVTTujpy3z4p7w08eOcp0'; // Your Google Spreadsheet ID
    const range = 'Sheet1';  // The sheet you are counting rows from

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        });
        const rows = response.data.values;
        return (rows) ? (rows.length - 1) : 0;  // Return the number of rows
    } catch (error) {
        console.error('Error fetching row count from Google Sheets:', error);
        return 0;  // If there's an error, assume 0 rows for comparison
    }
}
// 
// // const connectDB = require('./db');
// const connectDB = require('./db');
// 
//  


const getSQLRowCount = async () => {
    // Create a new promise to handle the async query
    return new Promise((resolve, reject) => {
        // const dbConnection = connectDB();  // Get the connection object

        // Define the SQL query to retrieve the row count
        const sqlQuery = 'SELECT COUNT(*) AS rowCount FROM users';

        // Execute the query
        dbConnection.query(sqlQuery, (err, results) => {
            // dbConnection.end();  // Close the connection

            if (err) {
                return reject(err);  // Reject the promise if there's an error
            }

            // Extract rowCount from the results and resolve the promise
            const rowCount = results[0].rowCount;
            resolve(rowCount);
        });
    });
};

const getSQLRecords = async (startRow) => {
    
    return new Promise((resolve, reject) => {
         // Get the connection object
        //  const dbConnection = connectDB()

        // Define the SQL query to retrieve records starting from a specific row
        const sqlQuery = `SELECT * FROM users LIMIT ${startRow - 1}, 100`;  // Adjust LIMIT as needed

        // Execute the query
        dbConnection.query(sqlQuery, (err, results) => {
            // dbConnection.end();  // Close the connection

            if (err) {
                return reject(err);  // Reject the promise if there's an error
            }

            // Resolve the promise with the fetched records
            resolve(results);
        });
    });
};
 



async function readSheet() {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1lNzfHAJMXRwaJWwqSDwdKZHVTTujpy3z4p7w08eOcp0';
    const range = 'Sheet1';  // Adjusting the range to read the whole sheet dynamically.

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId, range
        });

        const rows = response.data.values;  // Extracts the rows from the response.

        // Check if rows exist, otherwise handle no data case
        if (!rows || rows.length === 0) {
            return { message: "No data found in the spreadsheet" };  // Return custom message if no data is found.
        }

        return rows;  // Return the rows if data is found.
    } catch (error) {
        console.error('Error reading sheet:', error);  // Logs errors.
        return { message: "Error reading the spreadsheet" };  // Return error message.
    }
}


async function appendToSheet(values) {
    const sheets = google.sheets({ version: 'v4', auth });  // Creates a Sheets API client instance.
    const spreadsheetId = '1lNzfHAJMXRwaJWwqSDwdKZHVTTujpy3z4p7w08eOcp0';  // The ID of the spreadsheet.
    const range = 'Sheet1!A1';  // The range in the sheet where data will be written.
    const valueInputOption = 'USER_ENTERED';  // How input data should be interpreted.

    const resource = { values };  // The data to be appended.

    try {
        const res = await sheets.spreadsheets.values.append({
            spreadsheetId, range, valueInputOption, resource
        });
        return res;  // Returns the response from the Sheets API.
    } catch (error) {
        console.error('error', error);  // Logs errors.
    }
}

const synchronizing = async () => {

 
        const sheetRowCount = await getSheetRowCount()
        const sqlRowCount = await getSQLRowCount()
        const diff = sqlRowCount - sheetRowCount


        if (diff > 0){
            const extraRows = await getSQLRecords(sheetRowCount + 1)
              
               const formattedRows = extraRows.map(row => Object.values(row));  
 
               const appendResponse = await appendToSheet(formattedRows);

               return 'Data synchronizing successfull'
            
        }
        else{
          
            return 'No data for synchronize'
        }
         
    
};

module.exports = { synchronizing };
