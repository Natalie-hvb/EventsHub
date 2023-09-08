const express = require('express');
const route = require('./config/routes');
const app = express();
require('./config/mongoose')

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(route);
app.listen(1100, () => console.log('Server on 1100'))