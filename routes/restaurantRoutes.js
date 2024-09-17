const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  fetchAllRestaurantsController,
  restaurantDetailsController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// CREATE RESTAURANT
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS
router.get("/all", fetchAllRestaurantsController);

// GET A SINGLE RESTAURANT
router.get("/:id", restaurantDetailsController);

// DELETE RESTAURANT
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
