import { NextResponse } from "next/server";
import connectToDatabase from "@/app/utils/dbConneaction";
import userModle from "@/app/models/userModle";
import GetCurrentUser from "@/app/utils/GetCurrentUser";

export async function POST(req) {
  try {
    await connectToDatabase();
    const user = await GetCurrentUser();
    const { postId } = await req.json();
    if (user.saved.includes(postId)) {
      user.saved.splice(user.saved.indexOf(postId), 1);
      user.save();
      return NextResponse.json({message:"not saved"})
    } else {
      user.saved.push(postId);
      user.save();
      return NextResponse.json({message:"saved"})
    }
  } catch (error) {
    console.log("something wan wrong to save the post error ", error.message);
    return NextResponse.json({ mssage: error.message });
  }
}
