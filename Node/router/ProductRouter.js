const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../config/multer.config');

router.post("/", upload.fields([
    { name: "image", maxCount: 1 }, // صورة أساسية
    { name: "images", maxCount: 5 } // صور إضافية
]), productController.createProduct);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id',productController.deleteProducts)
router.put('/:id', upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 }
]), productController.editProducts);

module.exports = router;
