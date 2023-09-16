const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const forumController = require('../controllers/forumController')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

// routes
router.get('*', checkUser);

router.get('/', mainController.homePage);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

//Forum Routes

router.get('/forum', forumController.getForum);
router.post('/new-post', forumController.createNewPost);

router.get('/post/:id', forumController.getFullPost);
router.post('/delete-post/:id', forumController.deletePost);

router.get('/post/edit/:id', forumController.getEditPage);
router.post('/post/edit/:id', forumController.updatePost);

router.post('/add-comment/:id', forumController.addComment)


module.exports = router;