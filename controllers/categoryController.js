const categoryModel = require("../models/categoryModel");

// CREATE | POST
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      res.status(400).send({
        success: false,
        message: "Please provide a title",
      });
    }

    const category = new categoryModel({
      title,
      imageUrl,
    });

    await category.save();

    res.status(201).send({
      success: true,
      message: "Category creation successfull",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating a category",
      error,
    });
  }
};

// FETCH ALL RESTAURANTS | GET
const fetchAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (!categories) {
      res.status(404).send({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
      totalCount: categories.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching category data",
      error,
    });
  }
};

// UPDATE DETAILS | PUT
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category details",
      error,
    });
  }
};

// DELETE RESTAURANT | DELETE
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Category id is missing",
      });
    }

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category deleted succssfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  fetchAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
