'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            // Check if user already exists
            const resUserExists = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const userExistsData = await resUserExists.json();
            if (resUserExists.ok && userExistsData.user) {
                setError("User already exists.");
                return;
            }

            // Register the user
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                // Clear the form and redirect to the login page
                setName("");
                setEmail("");
                setPassword("");
                router.push("/login");
            } else {
                const errorData = await res.json();
                setError(errorData.message || "User registration failed.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardHeader className="justify-center items-center">
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                            name="name"
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            name="email"
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <Button type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    {error && <p className="text-red-500">{error}</p>}
                    <Link href="/login" className="mt-2">
                        Already have an account? Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUpForm;
