import { NextResponse } from "next/server";
import connectToDatabase from "@/app/utils/dbConneaction";
import postModle from "@/app/models/postModle";
import GetCurrentUser from "@/app/utils/GetCurrentUser";

export async function POST(req){
try{
    await connectToDatabase();
    const user = await GetCurrentUser(req);
    const body = await req.json();
    const post = await postModle.findOne({_id:body.postId});

   if(post.Likes.includes(user._id)){
    post.Likes.splice(post.Likes.indexOf(user._id),1);
    user.liked.splice(user.liked.indexOf(post._id),1);
    await post.save();
    await user.save();
    return NextResponse.json({message:"post unliked",post},{status:200},)
   }else{
    post.Likes.push(user._id);
    user.liked.push(post._id);
    await post.save();
    await user.save();
    return NextResponse.json({message:"post liked",post},{status:200},)
   }
}catch(error){
    return NextResponse.json({message:error.message}, {status:500})
}
}
