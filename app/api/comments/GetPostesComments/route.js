import connectToDatabase from "@/app/utils/dbConneaction"
import { NextResponse } from "next/server" 
import postModle from "@/app/models/postModle" 
import commentModle from "@/app/models/commentModle"
import userModle from "@/app/models/userModle"
import { populate } from "dotenv"

export async function GET(req){
    try{
        await connectToDatabase()
        const postId =req.nextUrl.searchParams.get("postId")
        const post = await postModle.findOne({_id:postId})
            .populate({
                path: 'comments',
                model: commentModle,
                populate: {
                    path: 'userId',
                    model: userModle,
                    select: 'username profileImage'
                }
            }).populate({
                path:"userId",
                model:userModle,
                select:"username profileImage"
            })

        return NextResponse.json(post)
    }catch(error){
        return NextResponse.json({message:error.message},{status:500})
    }
}