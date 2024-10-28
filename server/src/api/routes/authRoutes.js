const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authenticateToken, authController.getUser); // Ensure you have a getUser method in your authController
router.post('/logout', authenticateToken, authController.logout);
router.post('/update', authenticateToken, authController.updateDetails);

module.exports = router;
