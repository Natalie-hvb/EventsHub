const mongoose = require('mongoose');

const DB = 'mongodb+srv://natalie:natalie123@eventshub.8xtiyu9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to the db'))
  .catch((err) => console.log(err));