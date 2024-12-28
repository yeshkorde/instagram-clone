import connectToDatabase from "@/app/utils/dbConneaction";
import { NextResponse } from "next/server";
import GetCurrentUser from "@/app/utils/GetCurrentUser";
import postModle from "@/app/models/postModle";
import commentModle from "@/app/models/commentModle";
export async function POST(req){
try{
    await connectToDatabase();
    const {comment,postId} = await req.json();
    const post = await postModle.findOne({_id:postId});
    const user = await GetCurrentUser(req);
    if(!post){
        return NextResponse.json({message:"post not found"},{status:404})
    }
    const newComment = await commentModle.create({ text:comment,postId,userId:user._id});
    post.comments.push(newComment._id);
    await post.save();
    return NextResponse.json(newComment,{status:200})
}catch(error){
    return NextResponse.json({message:error.message},{status:500})
}
}
