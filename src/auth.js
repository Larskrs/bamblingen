import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google" 

import { db } from "@/lib/db"
import { JWTOptions } from "next-auth/jwt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })
  ],
  session: {
    strategy: "database"
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  async jwt({ token, user }) {
    const dbUser = await db.user.findFirst({
      where: {
        email: token.email,
      },
    });

    if (!dbUser) {
      token.id = user.id;
      return token;
    }

    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      picture: dbUser.image,
    };
  },
});