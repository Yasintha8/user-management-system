import Image from "../Models/ImageModel.js";


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

    // After successful upload 

    const newImage = new Image({
      url: `/uploads/${req.file.filename}`,
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
