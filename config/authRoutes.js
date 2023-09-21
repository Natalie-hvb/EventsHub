const express = require('express');
const router = express.Router();

const eventController = require("../controllers/eventController")
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const forumController = require('../controllers/forumController')
const auth = require('../middleware/authMiddleware');

// routes
router.get('*', auth.checkUser);
router.get('/', mainController.homePage);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.get('/contact', authController.contact_get)

//Forum Routes

router.get('/forum', auth.requireAuth, forumController.getForum);
router.post('/new-post/:id', auth.requireAuth, forumController.createNewPost);


router.get('/post/:id', forumController.getFullPost);
router.post('/delete-post/:id', forumController.deletePost);

router.get('/post/edit/:id', forumController.getEditPage);
router.post('/post/edit/:id', forumController.updatePost);

router.post('/add-comment/:postId/:userId', forumController.addComment) //Add new comment

//Events Routes

router.get('/events', eventController.getEventsPage);
router.post('/events/filter', eventController.filterEvents);

router.get('/events/add', eventController.getAddEventForm);
router.post('/events/add', eventController.addEvent);

router.get('/events/:id', eventController.getEventDetails);


module.exports = router;