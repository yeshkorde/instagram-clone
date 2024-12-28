import userModle from "@/app/models/userModle";
import GetCurrentUser from "@/app/utils/GetCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const {data} = await request.json();
        const currentUser = await GetCurrentUser();
        if(data === 'followers'){
            const currentUser = await GetCurrentUser()
           const user = await userModle.findOne({_id:currentUser._id}).populate('followers').select('-password')
           return NextResponse.json({followers:user.followers})
        }
        if(data === 'following'){
            const user = await userModle.findOne({_id:currentUser._id}).populate('following').select('-password')
           return NextResponse.json({following:user.following})
            
        }
        return NextResponse.json({data:1000})
    } catch (error) {
        console.log('some thing want to geting followers data ' , error.message);
        return NextResponse.json({error:error.message})
    }
}