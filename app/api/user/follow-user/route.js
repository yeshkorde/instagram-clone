import userModle from "@/app/models/userModle";
import GetCurrentUser from "@/app/utils/GetCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const follower = await request.nextUrl.searchParams.get('follower');
        const currentUser = await GetCurrentUser();
        const followerUser = await userModle.findOne({_id:follower});

       if(currentUser.following.indexOf(follower) == -1){
         currentUser.following.push(follower)
         currentUser.save();
         followerUser.followers.push(currentUser._id)
         followerUser.save();
         return NextResponse.json({message:'followed'})
       }

       if(currentUser.following.indexOf(follower) !== -1){
        currentUser.following.splice(currentUser.following.indexOf(follower),1);
        followerUser.followers.splice(followerUser.followers.indexOf(currentUser._id),1);
        followerUser.save();
        currentUser.save();
        return NextResponse.json({message:"unfollwed"})
       }
    } catch (error) {
        console.log(' some thing want wrong to follow user ');   
        return NextResponse.json({error:error.message})
    }
}