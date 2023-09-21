const express = require('express');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController'); // Import user controller
const businessController = require('../controllers/businessController'); // Import business controller
const eventController = require('../controllers/eventController'); // Import event controller

const route = express.Router();

route.get('/user/:id', userController.getUserById); // Add user router
route.get('/business/:id', businessController.getBusinessById); // Add business router

module.exports = route;
