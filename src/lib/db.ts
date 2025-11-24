import mongoose from "mongoose"; // Mongoose library ko import kiya hai

const MONGODB_URL = process.env.MONGODB_URL || ""; // MongoDB ka URL environment variable se liya hai

if(!MONGODB_URL){
  // Agar MONGODB_URL nahi mila, toh error throw kar diya
  throw new Error("MONGODB_URL is not defined in environment variables");
}

let cached = global.mongoose; // Global object me mongoose ka cached connection check kiya

if(!cached){
  // Agar cached object nahi mila, toh naya object bana diya
  cached = global.mongoose = { conn: null, promise: null };
}

const ConnectDB = async () => {
  if(cached.conn){
    // Agar pehle se connection hai, toh wahi return kar diya (reuse kar rahe hain)
    return cached.conn;
  }
  if(!cached.promise){
    // Agar promise nahi bani hai, toh nayi promise create ki aur connection start kiya
    cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
      return mongoose.connection; // Connection milne par mongoose.connection return kiya
    });
  }
  try {
    const conn = await cached.promise; // Promise ka result ka wait kiya (connection milne ka)
    return conn; // Connection return kiya
  } catch (error) {
    // Agar connection me error aayi, toh error console me print ki
    console.log("Error connecting to database:", error);
  }
}

export default ConnectDB; // ConnectDB function ko export kiya hai taaki dusre files me use ho sake

// ---
// Yeh code Next.js/serverless environment ke liye use hota hai, kyunki yahan har request par naya server instance ban sakta hai.
// Agar har request par naya DB connection banega toh MongoDB par bahut load padega aur errors aa sakti hain.
// Isliye, hum connection ko global object me cache karte hain, taaki ek hi connection baar-baar reuse ho sake.
// Yeh approach efficient hai aur production best practice bhi hai.