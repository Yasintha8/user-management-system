import express from "express";
import { createUsers, getAllUsers } from "../Controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);
UserRouter.post("/", createUsers);

export default UserRouter;