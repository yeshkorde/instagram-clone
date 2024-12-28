import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){

    try {
        const cookie = await cookies();
        const token = await cookie.get('token');
        if(!token){
            return NextResponse.json({sucess:false,error:'some thing wnat wrong to logout'})
        }
        cookie.delete('token')
        return NextResponse.json({sucess:true,message:'log out sucessfully'});

    } catch (error) {
        console.log('some thing want wrong to logout user ');
        return NextResponse.json({sucess:false,message:'log out sucessfully'});
       
    }
}