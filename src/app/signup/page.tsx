import React from 'react'
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