const express = require("express");
const { categoryModel } = require("../model/category.model");
const { auth } = require("../middlewares/auth.middleware");
const multer = require("multer");
const fs = require("fs");
const { cloudinary } = require("../config/cloudinary.config");
const categoryRouter = express.Router();
categoryRouter.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  createParentPath: true, // This option will create parent directories if they don't exist
});
const upload = multer({ storage: storage });

// Create new category
categoryRouter.post("/", auth, upload.single("image"), async (req, res) => {
  const { name, slug } = req.body;
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const category = new categoryModel({
      name,
      slug,
      image: result.secure_url, // Use Cloudinary URL
      owner: req.userID,
    });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all categories
categoryRouter.get("/", auth, async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read single category
categoryRouter.get("/:categoryId", auth, async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
categoryRouter.put(
  "/:categoryId",
  auth,
  upload.single("image"),
  async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, slug } = req.body;
    const newImage = req.file; // New image file
    let image; // Previous image path

    try {
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Save the path of the previous image
      image = category.image;

      // Update category fields
      category.name = name;
      category.slug = slug;
      if (newImage) {
        // If a new image is uploaded, upload it to Cloudinary and update the image field with the new URL
        const result = await cloudinary.uploader.upload(newImage.path);
        category.image = result.secure_url;

        // Delete the previous image file from Cloudinary
        if (image) {
          const public_id = image.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(public_id);
        }
      }

      await category.save();
      res
        .status(200)
        .json({ message: "Category updated successfully", category });
    } catch (error) {
      // If an error occurs, ensure to delete the newly uploaded image if it exists
      if (newImage) {
        fs.unlinkSync(newImage.path);
      }
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete category
categoryRouter.delete("/:categoryId", auth, async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the image file associated with the category if it exists in Cloudinary
    if (category.image) {
      const public_id = category.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(public_id);
    }

    // Delete the category from the database
    await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { categoryRouter };
