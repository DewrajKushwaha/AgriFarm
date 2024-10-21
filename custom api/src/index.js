
import connectDB from "./db/index.js";
import express from "express"
const app = express()


import dotenv from "dotenv"
dotenv.config({
    path:"./env"
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB is not connected !!",err)
})