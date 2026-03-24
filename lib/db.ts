import mongoose from "mongoose";
import { lockfileTryAcquireSync } from "next/dist/build/swc/generated-native";
const mongodburl=process.env.MONGODB_URL;
if(!mongodburl){
  throw new Error("MONGODB_URL is not defined in environment variables");
}
let cached=global.mongooseConn
if(!cached){
  cached=global.mongooseConn={conn:null,promise:null}
}
const connectDB=async()=>{
  if(cached.conn){
    return cached.conn;
  }
  if(!cached.promise){
    cached.promise=mongoose.connect(mongodburl).then((mongoose)=>{
      return mongoose.connection;
    }).catch((error)=>{
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });

  }
  try {
    const conn=await cached.promise;
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}