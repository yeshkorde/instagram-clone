
import { NextResponse } from "next/server";
import userModle from "@/app/models/userModle";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import userValidation from "@/app/schemas/userSchema";
import connectToDatabase from "@/app/utils/dbConneaction";

export async function POST(request){
    try {

   connectToDatabase();
        
      const {username,email,password} = await request.json();

        const findUserForEmail = await userModle.findOne({email});
        const userverify = await userValidation({username,email,password})
        const findUserForUsername = await userModle.findOne({username});
        if(userverify){
            return NextResponse.json({error:userverify.message});
        }

        if(findUserForEmail){
            return NextResponse.json({error:'This Email Is All Ready Existes Please Try Anoter One'})
        }
        
       if(findUserForUsername){
        return NextResponse.json({error:'This Usename is All Ready Taken Pleast Choose Another One '})
       }
        
   
       const hashedPassword = await bcrypt.hash(password,10);
       const newuser = await userModle.create({
        username,
        email,
        password:hashedPassword,
       }) 

      const cookie = await cookies();
      const token = await jwt.sign(email,process.env.JWT_SECRET);
      cookie.set('token',token,{
        httpOnly:true,
        secure:true,
      })

       return NextResponse.json({newuser,sucess:true})

    } catch (error) {
        console.log(error.message);
    }
}
