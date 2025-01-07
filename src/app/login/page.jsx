"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                // setError(res.error);
                setError("Invalid Credientials");
                return;
            }

            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
                <CardHeader className='justify-center items-center'>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}
                        className='flex flex-col gap-4'>
                        <Input onChange={(e) => {
                            setEmail(e.target.value);
                        }} type='email' placeholder='Email' />
                        <Input onChange={(e) => {
                            setPassword(e.target.value);
                        }} type='password' placeholder='Password' />
                        <Button type='submit'>Login</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <form action="" className='flex flex-col gap-3 items-center justify-center'>
                        <span>Or</span>
                        <Button type='submit' variant={'outline'}>Login with Google</Button>
                    </form>

                    {
                        error && (<h2 className="text-red-500">{error}</h2>)
                    }
                    <Link href="/register" className='mt-2'>Don't have an Account? Sign Up</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm