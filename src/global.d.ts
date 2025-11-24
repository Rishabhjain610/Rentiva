// Yahan humne mongoose ke Connection type ko import kiya hai
import { Connection } from "mongoose";

// Ye global declaration hai, jisse hum globally mongoose ka ek object bana sakein
// Is object me do properties hain:
// conn: Jo ya to ek mongoose connection hoga ya null (agar abhi tak connection nahi hua hai)
// promise: Jo ya to ek mongoose connection promise hoga ya null (agar abhi tak promise nahi bani hai)
// Iska use hota hai taaki hum serverless ya Next.js jaise environment me mongoose connection ko reuse kar sakein
declare global{
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// Ye line zaroori hai taaki ye file apne aap me ek module ban jaye
export {}