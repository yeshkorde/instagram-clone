import connectToDatabase from "@/app/utils/dbConneaction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import userModle from "@/app/models/userModle";

export async function GET(request){
try {
    connectToDatabase();
    const cookie = await cookies();
    const token = await cookie.get('token').value;
    if(token){
       const email = await jwt.verify(token,process.env.JWT_SECRET);
      const currentuser = await userModle.findOne({email}).select('-password');
      return NextResponse.json({currentuser})
    }
    return NextResponse.json({token})
} catch (error) {
    return NextResponse.json({error:error.message})
    console.log('some thing want wrong to geting user Data',error.message);
}
}