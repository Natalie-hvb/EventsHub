const express = require('express');
const userController = require('../controllers/userController'); // Import user controller
const route = express.Router();

route.get('/user/:id', userController.getUserById); // Add user router

module.exports = route;
