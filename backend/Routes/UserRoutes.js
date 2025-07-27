import express from "express";
import { createUsers, deleteUser, getAllUsers, getUserById, updateUser } from "../Controllers/UserController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

UserRouter.use(verifyToken); // ALL routes are protected

UserRouter.get("/", getAllUsers);
UserRouter.post("/", createUsers);
UserRouter.get("/:id", getUserById);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;