const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE | POST
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      res.status(400).send({
        success: false,
        message: "Please provide mandatory fields",
      });
    }

    const food = await foodModel.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    res.status(201).send({
      success: true,
      message: "Food creation successfull",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating a food",
      error,
    });
  }
};

// FETCH ALL FOODS | GET
const fetchAllFoodsController = async (req, res) => {
  try {
    const food = await foodModel.find();

    if (!food) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Foods fetched successfully",
      data: food,
      totalCount: food.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching food's data",
      error,
    });
  }
};

// FETCH DETAILS | GET
const fetchSingleFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "ID is missing!",
      });
    }

    const food = await foodModel.findById({ _id: id });

    if (!food) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food details fetched successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching food details",
      error,
    });
  }
};

// FETCH FOOD DETAILS BY RESTAURANT | GET
const foodByResturantController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "ID is missing!",
      });
    }

    const food = await foodModel.find({ restaurant: id });

    if (!food) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food details fetched successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching food details of a restaurant",
      error,
    });
  }
};

// UPDATE FOOD DETAILS | PUT
const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "ID is missing!",
      });
    }

    const food = await foodModel.findById({ _id: id });

    if (!food) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updatedFoodDetails = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: "Food details updated successfully",
      data: updatedFoodDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating food details",
      error,
    });
  }
};

// DELETE FOOD ITEM | DELETE
const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).send({
        success: false,
        message: "Id is missing!",
      });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    await foodModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "Food deletion successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the food",
      error,
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;

    if (!cart) {
      res.status(400).send({
        success: false,
        message: "Please add to cart and enter payment details",
        error,
      });
    }

    let totalPrice = 0;

    cart.map(item => (totalPrice += item.price));

    const newOrder = await orderModel.create({
      foodItems: cart,
      payment: totalPrice,
      buyer: req.body.id,
    });

    res.status(201).send({
      success: true,
      message: "Order place successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while placing an order",
      error,
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      res.status(404).send({
        success: false,
        message: "Order Id is missing!",
      });
    }

    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching order status",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  fetchAllFoodsController,
  fetchSingleFoodController,
  foodByResturantController,
  updateFoodController,
  placeOrderController,
  orderStatusController,
  deleteFoodController,
};
