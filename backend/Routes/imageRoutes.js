import express from "express";
import multer from "multer";
import path from "path";
import { deleteImage, getImages, uploadImage } from "../Controllers/imageController.js";

const imageRouter = express.Router();

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save to uploads/ folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Routes
imageRouter.post("/upload", upload.single("image"), uploadImage);
imageRouter.get("/getImages", getImages);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;
