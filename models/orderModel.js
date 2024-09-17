const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true },
);

//export
module.exports = mongoose.model("Order", orderSchema);
