const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: Array,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://imgs.search.brave.com/iWnCT3lR5iw046Q5mH0h4GoxTmSX4Zv0Bz7zgKuALfk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzI4LzU2LzA1/LzM2MF9GXzgyODU2/MDU1Nl9oZmdqczE2/VURONFZGSmNSVERq/S1N4cnNxSHQzQVdz/My5qcGc",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
