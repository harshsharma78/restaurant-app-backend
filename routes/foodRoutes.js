const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createFoodController,
  fetchAllFoodsController,
  fetchSingleFoodController,
  foodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

// CREATE FOOD ITEM
router.post("/create", authMiddleware, createFoodController);

// FOOD ITEMS LIST
router.get("/all", fetchAllFoodsController);

// FETCH SINGLE FOOD ITEM
router.get("/:id", fetchSingleFoodController);

// FETCH FOOD BY RESTAURANT
router.get("/byRestaurant/:id", foodByResturantController);

// UPDATE FOOD DETAILS
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD ITEM
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE AN ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController,
);

module.exports = router;
