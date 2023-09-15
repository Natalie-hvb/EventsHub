const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./config/authRoutes');
const cookieParser = require('cookie-parser');
require('./config/mongoose')
const otherRoutes = require('./config/otherRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

app.use(authRoutes);
app.use(otherRoutes);

app.listen(7000, () => {
  console.log("Server started on port 7000");
});