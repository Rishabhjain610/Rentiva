import mongoose, { Schema, Model } from "mongoose";

// IUser interface banaya hai, jo user ke data ka structure define karta hai
// _id optional hai, baaki fields jaise name, email, password required hain
// mobile optional hai, role me sirf "user", "deliveryboy", ya "admin" hi ho sakta hai
interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile?: string;
  role: "user" | "deliveryboy" | "admin";
}

// userSchema banaya hai, jo MongoDB me user document ka structure set karta hai
// name, email, password required hain
// email unique hona chahiye
// mobile optional hai
// role field me sirf 3 values allowed hain, default "user" hai
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "deliveryboy", "admin"],
      default: "user",
    },
  },
  { timestamps: true } // isse createdAt aur updatedAt fields auto add ho jayengi
);

// User model banaya hai, agar pehle se model exist karta hai to wahi use hoga
// warna naya model create hoga
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;