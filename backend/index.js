const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Middleware
app.use("/", (req, res, next) => {
    res.send("It is working");
})

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