const express = require("express");
const { productModel } = require("../model/product.model");
const { auth } = require("../middlewares/auth.middleware");
const multer = require("multer");
const fs = require("fs");
const { cloudinary } = require("../config/cloudinary.config");
const productRouter = express.Router();
productRouter.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  createParentPath: true, // This option will create parent directories if they don't exist
});
const upload = multer({ storage: storage });

// Create new product
productRouter.post("/", auth, upload.single("image"), async (req, res) => {
  const { title, description, price, category } = req.body;
  const owner = req.userID;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new productModel({
      title,
      description,
      price,
      category,
      image: result.secure_url, // Use Cloudinary URL
      owner,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
productRouter.put(
  "/:productId",
  auth,
  upload.single("image"),
  async (req, res) => {
    const productId = req.params.productId;
    const { title, description, price, category } = req.body;
    const newImage = req.file; // New image file
    let image; // Previous image path

    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Save the path of the previous image
      image = product.image;

      // Update product fields
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      if (newImage) {
        // If a new image is uploaded, upload it to Cloudinary and update the image field with the new URL
        const result = await cloudinary.uploader.upload(newImage.path);
        product.image = result.secure_url;

        // Delete the previous image file from Cloudinary
        if (image) {
          const public_id = image.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(public_id);
        }
      }

      await product.save();
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      // If an error occurs, ensure to delete the newly uploaded image if it exists
      if (newImage) {
        fs.unlinkSync(newImage.path);
      }
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all products
productRouter.get("/", auth, async (req, res) => {
  const { search } = req.query;
  const { filter } = req.query;
  try {
    if (search) {
      const regex = new RegExp(search, "i");
      const products = await productModel.find({ title: regex });
      res.status(200).json({ products });
    } else if (filter) {
      const products = await productModel.find({ category: filter });
      res.status(200).json({ products });
    } else {
      const products = await productModel.find();
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
productRouter.get("/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
productRouter.delete("/:productId", auth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the image file associated with the product if it exists in Cloudinary
    if (product.image) {
      const public_id = product.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(public_id);
    }

    // Delete the product from the database
    await productModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { productRouter };
