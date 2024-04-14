const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      default: 1,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = { cartModel };
