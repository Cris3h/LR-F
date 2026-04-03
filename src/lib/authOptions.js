import GoogleProvider from "next-auth/providers/google";

/** Config compartida: NextAuth route y getServerSession en API routes */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
};
