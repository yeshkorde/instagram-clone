import userModle from "@/app/models/userModle";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import connectToDatabase from "@/app/utils/dbConneaction";

export async function POST(request){
try {
  connectToDatabase();
    const {email,password} = await request.json();
   const findUserByEmail = await userModle.findOne({email});
   
   if(!findUserByEmail){
    return NextResponse.json({error:'Email Or Password IS Incorrect'})
   }

   const resultOfPassword = await bcrypt.compare(password,findUserByEmail.password);

   if(!resultOfPassword){
    return NextResponse.json({error:'Email Or Password IS Incorrect'})
   }

   const cookie = cookies();
   const token = jwt.sign(email,process.env.JWT_SECRET);
   cookie.set('token',token,{
     httpOnly:true,
     secure:true,
   })

    return NextResponse.json({sucess:true})


} catch (error) {
      console.log(error.message);
}
}