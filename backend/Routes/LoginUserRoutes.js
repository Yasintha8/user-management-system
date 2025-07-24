import express from "express";
import { LoginUser } from "../Controllers/LoginUserController.js";

const LoginUserRouter = express.Router();

LoginUserRouter.post("/loginUser", LoginUser);

export default LoginUserRouter;