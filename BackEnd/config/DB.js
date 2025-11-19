import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.Mongo_url).then(()=>console.log("cnx to DB succeded"))
.catch((err)=>{console.log("cnx to DB failed",err.message)});
