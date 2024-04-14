const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { cartModel } = require("../model/cart.model");
const { productModel } = require("../model/product.model");
const cartRouter = express.Router();
cartRouter.use(express.json());

// Add to cart
cartRouter.post("/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userID;

    // Create a new cart item
    const cartItem = new cartModel({ product_id: productId, owner: userId });

    // Save the cart item to the database
    await cartItem.save();

    res.status(201).json({ msg: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quantity
cartRouter.patch("/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userID;

    // Find the cart item
    const cartItem = await cartModel.findOne({
      product_id: productId,
      owner: userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Increment or decrement quantity based on action
    let newQuantity = cartItem.quantity;
    if (req.body.action === "increase") {
      newQuantity += 1;
    } else if (req.body.action === "decrease") {
      if (newQuantity > 1) {
        newQuantity -= 1;
      } else {
        return res
          .status(400)
          .json({ message: "Quantity cannot be less than 1" });
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Update quantity
    cartItem.quantity = newQuantity;
    await cartItem.save();

    res
      .status(200)
      .json({ message: "Quantity updated successfully", newQuantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item from cart
cartRouter.delete("/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.userID;

    // Find and delete the cart item
    const cartItem = await cartModel.findOneAndDelete({
      product_id: productId,
      owner: userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products in the cart of the authenticated user
cartRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.userID;

    // Find all cart items for the user
    const cartItems = await cartModel.find({ owner: userId });

    // If there are no cart items, return an empty array
    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json([]);
    }

    // Map over the cart items and retrieve the associated products
    const products = await Promise.all(
      cartItems.map(async (cartItem) => {
        // Find the product associated with the cart item
        const product = await productModel.findById(cartItem.product_id);

        // Create a new object with product details and quantity
        const productWithQuantity = {
          ...product.toObject(), // Convert Mongoose document to plain JavaScript object
          quantity: cartItem.quantity,
        };

        return productWithQuantity;
      })
    );

    // Send the array of products in the response
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { cartRouter };
