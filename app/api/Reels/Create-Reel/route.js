import { NextResponse } from "next/server";
import fs from  "fs/promises"
import reelsModle from "@/app/models/reelsModle";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import GetCurrentUser from "@/app/utils/GetCurrentUser";
import connectToDatabase from "@/app/utils/dbConneaction";

export async function POST(req){

 try {
  await connectToDatabase();
  const formData = await req.formData();
  const file = formData.get("file");
  const caption = formData.get("caption");
  const description = formData.get("description");
  const link = formData.get("link");
  
  const videotypes = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/avi", "video/mpeg", "video/webm", "video/ogg"];
  
  if(!videotypes.includes(file.type)){
      return NextResponse.json(
        { message: "Please upload a video file" },
        { status: 400 }
      )
    }else{
      const video = await file.arrayBuffer();
      const videoBuffer = Buffer.from(video);
      const ext = path.extname(file.name);
      const videoName = `${Date.now()}-${uuidv4()}${ext}`;
      const uplodePath = `public/reelVideos/${videoName}`;
      const dbPath = `reelVideos/${videoName}`;
      await fs.writeFile(uplodePath,videoBuffer);
      const currentUser = await GetCurrentUser();

      const newReel = await reelsModle.create({
        videoUrl:dbPath,
        caption,
        description,
        link,
        userId:currentUser._id
      })
     

   return NextResponse.json({message:"Reel created successfully",newReel})
    }
 } catch (error) {
  console.log(error.message);
    return NextResponse.json({message:error.message},{status:500})
 }

}
