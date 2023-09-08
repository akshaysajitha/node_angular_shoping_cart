const express = require('express');
const bodyParser = require('body-parser');
const productroot=require('./routes/productroute')
const db = require('./db');
const cors = require('cors');




const app = express();

// cors
app.use(cors());

app.use(bodyParser.json());

// Use  handling routes

app.use('/product',productroot);


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
