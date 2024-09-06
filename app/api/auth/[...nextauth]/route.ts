import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null
      },
    }),
  ],
});

export { handler as GET, handler as POST };
