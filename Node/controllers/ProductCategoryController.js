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

exports.DeleteCategory = async (req, res) => {
    const { id } = req.params; 
    try {
        const category = await ProductsCategory.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.UpdateCategory = async (req, res) => {
    const { id } = req.params; 
    try {
        const updatedCategory = await ProductsCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
