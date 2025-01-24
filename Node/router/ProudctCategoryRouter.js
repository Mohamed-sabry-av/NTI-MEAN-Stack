const express = require("express");
const router = express.Router();
const ProductCategory = require("../controllers/ProductCategoryController");

router.post("/", ProductCategory.CreateCategory);
router.get("/", ProductCategory.GetCategory);
router.get("/:id", ProductCategory.GetCategoryByID);
router.put("/:id", ProductCategory.UpdateCategory);
router.delete("/:id", ProductCategory.DeleteCategory);

module.exports = router;
