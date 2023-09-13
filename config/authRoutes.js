const { Router } = require('express');
const authController = require('../controllers/authController');
const forumController = require('../controllers/forumController')

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.get('/forum', forumController.getPost);
router.post('/create-post', forumController.createPost);

module.exports = router;