// import Session from "inspector/promises";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../../models/user"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                // const user = { id: "1" };
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatched = await bcrypt.compare(password, user.password);

                    if (!passwordMatched) {
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log("Error: ", error);
                }
                // return user;
            },
        }),

    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
