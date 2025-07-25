import Image from "../Models/ImageModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Upload image and save URL to DB
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return res.status(400).json({ message: "Invalid file format" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File size limit exceeded" });
    }

    if (req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "image/png") {
      return res.status(400).json({ message: "Invalid file type" });
    }

    console.log("File uploaded successfully:", req.file.filename);

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newImage = new Image({
      url: imageUrl,
    });

    await newImage.save();

    res.status(201).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error while uploading image" });
  }
};


// Get all uploaded images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find({ url: { $regex: /\.(jpg|jpeg|png|gif)$/i } }).sort({ uploadedAt: -1 }); // Find images with supported extensions
    res.status(200).json(images);
  } catch (error) {
    console.error("Get error:", error);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete the image file from the server
    const filename = image.url.split("/uploads/")[1];
    const filePath = path.join(__dirname, "../uploads", filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error("File deletion error:", err);
    });

    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting image" });
  }
};

