import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/UserRoutes.js";
dotenv.config();
import cors from "cors";
import RegisterUserRouter from "./Routes/RegisterUserRoutes.js";
import LoginUserRouter from "./Routes/LoginUserRoutes.js";

const app = express();
app.use(cors()); //cross origin resource sharing

//Middleware
app.get('/',(req, res)=> res.send('API is working!'));

app.use(express.json());
app.use('/api/users',UserRouter)
app.use('/api/register',RegisterUserRouter)
app.use('/api/login',LoginUserRouter)

mongoose.connect(process.env.MONGO_URl)
.then(()=>
    console.log("Connected to DB")
)
.then(()=>{
    app.listen(3000);
})
.catch((err)=>
    console.log(err)
)