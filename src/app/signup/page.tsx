'use client'; // Ensure this file runs as a client component

import React from 'react';
import { User } from "../../models/userModel";
import { hash } from 'bcryptjs';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/utils';

const Page = () => {
    const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent form submission default behavior

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Connect to the database
            await connectToDatabase();

            // Check if the user already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                alert("User already exists. Please login.");
                return;
            }

            // Hash the password and create the user
            const hashedPassword = await hash(password, 10);
            await User.create({
                name,
                email,
                password: hashedPassword,
            });

            alert("Sign-up successful! Redirecting to login...");
            redirect("/login");
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("An error occurred during sign-up. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader className="justify-center items-center">
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={signUp} className="flex flex-col gap-4">
                        <Input placeholder="Name" name="name" />
                        <Input type="email" placeholder="Email" name="email" />
                        <Input type="password" placeholder="Password" name="password" />
                        <Button type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            // For Google login using NextAuth
                            window.location.href = "/api/auth/signin/google";
                        }}
                    >
                        Login with Google
                    </Button>
                    <Link href="/login" className="mt-2">
                        Already have an Account? Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;



/*import React from 'react'
import { User } from "../../models/userModel"
import { hash } from 'bcryptjs'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/utils'

const Page = () => {

    const signUp = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!email || !password || !name)
            throw new Error("Please fill in all fields");

        // Connection to the database

        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) throw new Error("User already exists");

        const hashedPassword = await hash(password, 10);

        // Creste new User

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        redirect("/login");
    }

    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader className='justify-center items-center'>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signUp} className='flex flex-col gap-4'>
                        <Input placeholder='Name' name='name' />
                        <Input type='email' placeholder='Email' name='email' />
                        <Input type='password' placeholder='Password' name='password' />
                        <Button type='submit'>Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <form action="" className='flex flex-col gap-3 items-center justify-center'>
                        <span>Or</span>
                        <Button type='submit' variant={'outline'}>Login with Google</Button>
                    </form>

                    <Link href="/login" className='mt-2'>Already have an Account? Login</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page
*/