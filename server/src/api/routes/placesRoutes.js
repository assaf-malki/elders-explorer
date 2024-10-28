const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const authenticateToken = require('../middlewares/authenticateToken');

// Route to get places based on hobby, radius, and location
router.get('/places', authenticateToken, placesController.getPlaces);

module.exports = router;
