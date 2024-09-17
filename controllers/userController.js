const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

// USER DETAILS | GET
const userDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user's details",
      error,
    });
  }
};

// UPDATE USER DETAILS | PUT
const updateUserDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User details updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating user's details",
      error,
    });
  }
};

// UPDATE USER PASSWORD | POST
const updateUserPasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).send({
        success: false,
        message: "Please provide an old password and a new password!",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Hashing a password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the password",
      error,
    });
  }
};

// RESET USER PASSWORD | POST
const resetUserPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    const user = await userModel.findById({ _id: req.body.id });

    if (!email || !newPassword || !answer) {
      res.status(400).send({
        success: false,
        message: "Please fill necessary fields!",
      });
    } else if (answer !== user.answer) {
      res.status(400).send({
        success: false,
        message: "Answer does not match!",
      });
    }

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    // Hashing a password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while resetting the password",
      error,
    });
  }
};

// DELETE USER | DELETE
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete({ _id: id });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Account deletion successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the account",
      error,
    });
  }
};

module.exports = {
  userDetailsController,
  updateUserDetailsController,
  updateUserPasswordController,
  resetUserPasswordController,
  deleteUserController,
};
