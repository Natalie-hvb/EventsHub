const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./config/routes');
const cookieParser = require('cookie-parser');
require('./config/mongoose')

const app = express();

// Middleware
const corsOptions = {
  "origin": [3000, "http://localhost:3000", 'http://localhost:7000/forum'],
  "credentials": true,
  "methods": "GET, POST, DELETE, UPDATE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204

};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use('/public/img', express.static('./public/img'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

app.use(Routes);

app.listen(7000, () => {
  console.log("Server started on port 7000");
});