'use client';

import React from 'react'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from 'next-auth/react';

const page = () => {

    const { data: session } = useSession();

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Name : {session?.user?.name}</h2>
            <h2>Email : {session?.user?.email}</h2>
            <Button onClick={() => signOut({ callbackUrl: '/' })} type="button" variant="outline">Log Out</Button>
        </div>

    )
}

export default page