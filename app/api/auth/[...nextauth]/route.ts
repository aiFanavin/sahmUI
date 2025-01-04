// http://localhost:3000/api/auth/signin
// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";
import {authOptions} from "@/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }