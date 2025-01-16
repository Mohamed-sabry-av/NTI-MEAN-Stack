const ProductModel = require("../models/ProdectModel");
const fs = require('fs').promises;


exports.createProduct = async (req, res) => {
    try {
        const mainImage = req.files.image ? req.files.image[0].filename : null;

        if (!mainImage) {
            return res.status(400).json({ error: "Main image is required" });
        }

        // التحقق من وجود الصور الإضافية
        const additionalImages = req.files.images ? req.files.images.map(file => file.filename) : [];

        const product = await ProductModel.create({
            ...req.body,
            image: mainImage, 
            images: additionalImages 
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const product = await ProductModel.findById(id);
        if(!product){
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedData = req.body;
        
        if (req.files && req.files.image) {
            const oldMainImage = product.image;
            const newMainImage = req.files.image[0].path;

            // حذف الصورة القديمة إذا كانت موجودة
            if (oldMainImage) {
                await fs.unlink(oldMainImage).catch(err => console.error(`Error deleting old main image: ${err.message}`));
            }

            updatedData.image = newMainImage;
        }
        if (req.files && req.files.images) {
            const oldImages = product.images;

            // حذف الصور القديمة إذا كانت موجودة
            for (const imgPath of oldImages) {
                await fs.unlink(imgPath).catch(err => console.error(`Error deleting old additional image: ${err.message}`));
            }

            const newImages = req.files.images.map(file => file.path);
            updatedData.images = newImages;
        }

        // تحديث المنتج في قاعدة البيانات
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            return res.status(404).json({ error: "Product not found" });
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const product = await ProductModel.findById(id);
        if(!product){
            return res.status(404).json({ error: "Product not found" });
        }

        if(product.image){
            await fs.unlink(product.image).catch(err=> console.log(err.message))
        }

        if (product.images && product.images.length > 0) {
            for (const imgPath of product.images) {
                await fs.unlink(imgPath).catch(err => console.error(`Error deleting additional image: ${err.message}`));
            }
        }

        await ProductModel.deleteOne({ _id: id });

        res.status(200).json({ message: "Product and its images deleted successfully", product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

};
