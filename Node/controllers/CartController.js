const Cart = require('../models/CartModel');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
      const { userId, productId, quantity } = req.body;
      const newItem = new Cart({
        userId, 
        productId,
        quantity,
      });
      await newItem.save();
      res.status(201).json({ message: 'Item added to cart', data: newItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.query; 
    const items = await Cart.find({ userId }).populate('productId'); 
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // Product ID
    const { userId } = req.body; // User ID from request body
    const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
