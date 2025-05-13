import mongoose from "mongoose";
import { DB_Name } from "../constants/constant.js";
//iife

export const DBconnect = (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
         .then(()=>{console.log("dbconnected successfully")})
         .catch((err)=>{console.log("db not connected",err)})

    } catch (error) {
        console.log("error",error);
    }
}
)