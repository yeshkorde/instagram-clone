import connectToDatabase from "@/app/utils/dbConneaction";
import { NextResponse } from "next/server";
import userModle from "@/app/models/userModle";

export async function POST(request){
    try {
        connectToDatabase();

        const text = request.nextUrl.searchParams.get('text');
        if(text){
            const users = await userModle.find({
                username: { $regex:text, $options: "i" }}).select('-password');
                return NextResponse.json({users})
        }
        const message ='user not found'
        return NextResponse.json({message})
    } catch (error) {
        console.log('some thing is wrong to search user', error.message);
         return NextResponse.json({error})
    }
}