import postModle from "@/app/models/postModle";
 import { NextResponse } from "next/server";
import GetCurrentUser from "@/app/utils/GetCurrentUser";

 export async function GET(req){
    try{
      const currentUser = await GetCurrentUser()
    const postes = await postModle.aggregate([
      {
        $match: {
          $or: [
            { userId: { $in: currentUser.following } },
            { userId: currentUser._id }
          ]
        }
      },
      {
        $lookup: {
          from: "users", 
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$userId"
      },
    ])
    
    return NextResponse.json(postes)
    }catch(error){
        console.log(error.message)
        return NextResponse.json({message:error.message})
    }
 }