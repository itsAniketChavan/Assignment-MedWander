# Assignment-MedWander

 ## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: SQL
- **Data Synchronization**: Google Sheets API
- **Version Control**: Git

## Installation Steps
1. **Clone the Repository**
2. Install Dependencies For the backend:

For the Backend
cd ../backend
npm install

For the frontend:
Copy code
cd ../frontend
npm install

## Create a .env file in the backend directory with the following variables:

makefile
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_API_KEY=your_google_api_key

Start the backend server:
cd backend
npm run dev

Start the frontend application:
cd ../frontend
npm run dev

## Features

- **Dynamic Forms**: Users can choose between "Form A" and "Form B". Each form includes input fields for Name, Country Code, and Phone Number.
- **Form Validation**:
  - Name must be non-empty and contain only alphabetic characters.
  - Country Code must be selected from a predefined list.
  - Phone Number must be numeric and follow the format specified by the selected Country Code.
- **Database Integration**: Stores form submissions in an SQL database, recording form type, name, country code, and phone number.
- **Data Synchronization**: Connects to an online Excel sheet with a "Refresh" button to update the sheet with new data from the SQL database.


 
