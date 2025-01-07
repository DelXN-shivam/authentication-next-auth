import { NextResponse } from "next/server";
import User from "../../../../models/user"
import { connectMongoDB } from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await connectMongoDB();
    try {
        const {name, email, password} = await req.json();

        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);

        const user = await User.findOne({ email })
        console.log(user)
        if(user){
            return NextResponse.json({message:"User Already Exist"},{status:201})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        
        const newUser = await User.create({ name, email, password: hashedPassword });
        newUser.save()
        
        return NextResponse.json({message: "User Registred."}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error occured while Registring the User."}, {status: 500});
    }
}