const express = require('express');
const app = express();
require('dotenv').config();


app.get('/', (req, res) => {
    return res.status(200).json("welcome")
});



// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
