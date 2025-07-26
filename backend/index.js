import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();

app.use(cors());
// Fix for ES Modules (__dirname and __filename)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
// Routes
import UserRouter from "./Routes/UserRoutes.js";
import RegisterUserRouter from "./Routes/RegisterUserRoutes.js";
import LoginUserRouter from "./Routes/LoginUserRoutes.js";
import pdfRouter from "./Routes/pdfRoutes.js";
import imageRouter from "./Routes/imageRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Static folder for uploaded images 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => res.send("API is working!"));
app.use("/api/users", UserRouter);
app.use("/api/register", RegisterUserRouter);
app.use("/api/login", LoginUserRouter);
app.use("/api/pdf", pdfRouter);  // pdf upload & get
app.use("/api/gallery", imageRouter); // image upload & get

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URl)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
