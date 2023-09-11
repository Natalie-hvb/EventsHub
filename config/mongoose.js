// Connect to MongoDB
const mongoose = require('mongoose'); 
require('dotenv').config();


mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected to the db'))
  .catch((err) => console.log(err));