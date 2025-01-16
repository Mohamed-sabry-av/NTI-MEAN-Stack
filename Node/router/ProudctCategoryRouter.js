const express = require("express");
const router = express.Router();
const ProductCategory = require("../controllers/ProductCategoryController");

router.post("/", ProductCategory.CreateCategory);
router.get("/", ProductCategory.GetCategory);

module.exports = router;
