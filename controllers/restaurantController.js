const restaurantModel = require("../models/restaurantModel");

// CREATE | POST
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      isOpen,
      imageUrl,
      foods,
      pickup,
      timings,
      delivery,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      res.status(400).send({
        success: false,
        message: "Please provide title and coordinates",
      });
    }

    const restaurant = await restaurantModel.create({
      title,
      isOpen,
      imageUrl,
      foods,
      pickup,
      timings,
      delivery,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    res.status(201).send({
      success: true,
      message: "Restaurant creation successfull",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating a restaurant",
      error,
    });
  }
};

// FETCH ALL RESTAURANTS | GET
const fetchAllRestaurantsController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find();

    if (!restaurant) {
      res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurant,
      totalCount: restaurant.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching restaurant's data",
      error,
    });
  }
};

// FETCH DETAILS | GET
const restaurantDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "ID is missing!",
      });
    }

    const restaurant = await restaurantModel.findById({ _id: id });

    if (!restaurant) {
      res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant details fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching restaurant's details",
      error,
    });
  }
};

// DELETE RESTAURANT | DELETE
const deleteRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "Restaurant not found or the id is missing!",
      });
    }

    await restaurantModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "Restaurant deletion successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the restaurant",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  fetchAllRestaurantsController,
  restaurantDetailsController,
  deleteRestaurantController,
};
