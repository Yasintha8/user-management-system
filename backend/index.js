import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/UserRoutes.js";
dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());

//Middleware
app.get('/',(req, res)=> res.send('API is working!'));

app.use(express.json());
app.use('/api/users',UserRouter)

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