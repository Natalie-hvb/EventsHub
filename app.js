const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./config/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('./config/mongoose')
const otherRoutes = require('./config/otherRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('main'));

app.use(authRoutes);
app.use(otherRoutes);

app.listen(7000, () => {
  console.log("Server started on port 7000");
});