import GetCurrentUser from "@/app/utils/GetCurrentUser";
import { NextResponse } from "next/server";
import userModle from "@/app/models/userModle";
import postModle from "@/app/models/postModle";
export async function GET(req){
    try {
        const currentUser = await GetCurrentUser();
        const postes = await userModle.find({"_id":currentUser._id}).populate({
            path:"saved",
            model:postModle,
            select:"images caption discripation Likes comments createdAt"
        })
        return NextResponse.json(postes,{status:200})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500})
   
    }
}