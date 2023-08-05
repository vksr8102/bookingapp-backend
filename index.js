import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import usersRoute from "./api/routes/user.js"
import authRoute from "./api/routes/auth.js"
import hotelsRoute from "./api/routes/hotel.js"
import roomsRoute from "./api/routes/room.js"
import cookieParser from "cookie-parser";
import { veryfyToken } from "./api/utils/veryfyToken.js";
import cors from "cors"
dotenv.config({ path: '.env' });
const app = express();
mongoose.set("strictQuery", false);
async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    }
}


//-->middleWare
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/user",usersRoute)
 

app.use((err,req,res,next)=>{
    const errorStatus =err.status||500
    const errorMessage=err.message||"somthing went Wrong"
    res.status(errorStatus).send({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb connection disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connection connected");
})

app.listen(8800,()=>{
    connect();
    console.log("Connected to backend!");
});

