import { NextResponse } from "next/server";
import connectToDatabase from "@/app/utils/dbConneaction";
import userModle from "@/app/models/userModle";
import postModle from "@/app/models/postModle";
export async function GET(req,res){
try{
    await connectToDatabase();
    const userId = req.nextUrl.searchParams.get("userId");
    const user = await userModle.findOne({_id:userId})
    .populate({
        path: 'posts',
        model: postModle,
        select: 'images caption discripation Likes comments createdAt'
    })
    return NextResponse.json({
        user
    },{status:200})
}catch(error){
    return NextResponse.json({
        message:error.message
    },{status:500})
}
}