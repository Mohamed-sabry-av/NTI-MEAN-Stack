const ProductsCategory = require('../models/ProductCategorModel')

exports.CreateCategory = async (req, res) => {
    try {
        const NewCategory = await ProductsCategory.create(req.body);
        res.status(200).json(NewCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.GetCategory = async (req, res) => {
    try {
        const Categories = await ProductsCategory.find();
        res.status(200).json({ Categories });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}