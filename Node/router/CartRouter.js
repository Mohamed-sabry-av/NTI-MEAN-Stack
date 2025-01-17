const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

// Routes
router.post('/add', cartController.addToCart);
router.get('/', cartController.getCartItems);
router.delete('/remove/:id', cartController.removeFromCart);

module.exports = router;
