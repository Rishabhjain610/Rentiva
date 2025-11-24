import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import ConnectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        await ConnectDB();
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        (token.id = user.id),
          (token.name = user.name),
          (token.email = user.email),
          (token.role = user.role);
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:24*60*60 //1 day
  },
  secret:process.env.AUTH_SECRET                
  
});
