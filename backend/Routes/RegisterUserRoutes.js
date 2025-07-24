import express from "express";
import { registerUser } from "../Controllers/RegisterUserController.js";

const RegisterUserRouter = express.Router();

RegisterUserRouter.post("/registerUser", registerUser);

export default RegisterUserRouter;