import React from 'react'
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
import { CredentialsSignin } from 'next-auth'
import { signIn } from 'next-auth/react'

const Page = () => {

    const loginHandler = async (formData: FormData) => {
        "use server";
        const email = formData.get('email') as string | undefined;
        // const email = FormData.get('email') as string | undefined;
        const password = formData.get('password') as string | undefined;

        if (!email || !password) throw new Error('Email or password is missing');

        try {
            await signIn("credentials", {
                email,
                password,
            });
        } catch (error) {
            const err = error as CredentialsSignin;
            return err.message;
        }
    };

    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader className='justify-center items-center'>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={async () => {
                        loginHandler;
                    }}
                        className='flex flex-col gap-4'>
                        <Input type='email' placeholder='Email' />
                        <Input type='password' placeholder='Password' />
                        <Button type='submit'>Login</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <form action="" className='flex flex-col gap-3 items-center justify-center'>
                        <span>Or</span>
                        <Button type='submit' variant={'outline'}>Login with Google</Button>
                    </form>

                    <Link href="/signup" className='mt-2'>Don't have an Account? Sign Up</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page