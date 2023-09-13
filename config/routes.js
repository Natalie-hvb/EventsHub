const express = require('express');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController'); // Import user controller
const businessController = require('../controllers/businessController'); // Import business controller
const eventController = require('../controllers/eventController'); // Import event controller
const authController = require('../controllers/authController'); // Import authentication controller 
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const route = express.Router();


route.get('/', mainController.homePage);
route.get('/user/:id', userController.getUserById); // Add user route
route.get('/business/:id', businessController.getBusinessById); // Add business route
route.get('/event/:id', eventController.getEventById); // Add event route

route.get('/signup', authController.signUp); // Get Signup page
route.post('/sign-up', authController.signUpNewUser); // Post Signed User

route.get('/login', authController.logIn); // Get Login page
route.post('/log-in', authController.logInUser); // Post Login

route.get('/logout', authController.signOut);

module.exports = route;
