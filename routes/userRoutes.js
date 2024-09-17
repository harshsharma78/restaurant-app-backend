const express = require("express");
const {
  userDetailsController,
  updateUserDetailsController,
  updateUserPasswordController,
  resetUserPasswordController,
  deleteUserController
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// FETCH USER DETAILS
router.get("/fetchDetails", authMiddleware, userDetailsController);

// UPDATE USER DETAILS
router.put("/updateDetails", authMiddleware, updateUserDetailsController);

// UPDATE USER PASSWORD
router.post("/updatePassword", authMiddleware, updateUserPasswordController);

// RESET USER PASSWORD
router.post("/resetPassword", authMiddleware, resetUserPasswordController);

// DELETE A USER
router.delete("/delete/:id", authMiddleware, deleteUserController);

module.exports = router;
