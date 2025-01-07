import { NextResponse } from "next/server";
import User from "../../../../models/user"
import { connectMongoDB } from '../../../../lib/mongodb';

export async function POST(req) {
    await connectMongoDB();
    try {
        
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("user: ", user);
        return NextResponse.json({ user });
        
    } catch (error) {
        console.log(error);
        
    }
}