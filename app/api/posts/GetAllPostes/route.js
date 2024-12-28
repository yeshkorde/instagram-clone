import GetCurrentUser from "@/app/utils/GetCurrentUser";
import postModle from "@/app/models/postModle";
import { NextResponse } from "next/server";
import userModle from "@/app/models/userModle";
    export async function GET(req) {
    try {
        const currentUser = await GetCurrentUser();
        const posts = await userModle.findOne({_id:currentUser._id})
            .populate({
                path: 'posts',
                model: postModle,
                select: 'images caption discripation Likes comments createdAt'
            }).select('posts')
        return NextResponse.json(posts, {status:200});
    } catch (error) {
        console.log(error.message);
        
        return NextResponse.json({error:error.message}, {status:500})
    }
}