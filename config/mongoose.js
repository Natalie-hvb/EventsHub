// Connect to MongoDB
const mongoose = require('mongoose'); 
require('dotenv').config();


mongoose.connect(process.env.DB)
  .then(() => console.log('connected to the db'))
  .catch((err) => console.log(err)
);