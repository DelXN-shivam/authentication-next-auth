import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredientialProvider from 'next-auth/providers/credentials'
import { User } from "./models/userModel";
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredientialProvider({
            name: "Credientials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password', type: 'password'
                },
            },
            authorize: async (credentials) => {

                const email = credentials.email |undefined;
                const password = credentials.password  |undefined;

                console.log(email, password);

                if (!email || !password)
                    throw new CredentialsSignin({cause: 'Please provide both Email and Password'});

                // if (typeof email !== "string") 
                //     throw new CredentialsSignin({cause: 'Email is not Valid'});

                // Connection with Database here

                const user = await User.findOne({email}).select("+password");

                // const user = { email, id: 'dfd'};

                if(!user) 
                    throw new CredentialsSignin({cause: 'Invalid Email or Password'});

                if(!user.password) 
                    throw new CredentialsSignin({cause: 'Invalid Email or Password'});

                const isMatch = await compare(password, user.password);

                if(!isMatch) 
                    throw new CredentialsSignin({cause: 'Password does not match'});

                // if (password !== 'passcode') {
                //     throw new CredentialsSignin({cause: 'Password does not match'});
                // } else {
                //     return user;
                // }
                return {name: user.name, email: user,email, id: user._id};
            },
        }),
    ],
    pages:{
        signIn: "/login",
    },
});
