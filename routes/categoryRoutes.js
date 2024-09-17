const express = require("express");
const {
  createCategoryController,
  fetchAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE A CATEGORY
router.post("/create", authMiddleware, createCategoryController);

// FETCH ALL CATEGORIES
router.get("/all", fetchAllCategoriesController);

// UPDATE CATEGORY
router.put("/update/:id", authMiddleware, updateCategoryController);

// DELETE A USER
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
