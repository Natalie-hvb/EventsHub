const express = require('express');
const route = express.Router();
const mainController = require('../controllers/mainController');

route.get('/', mainController.homePage);


module.exports = route;