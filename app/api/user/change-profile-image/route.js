import { NextResponse } from "next/server";
import fs from  "fs/promises"
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import connectToDatabase from "@/app/utils/dbConneaction";
import jwt from "jsonwebtoken"
import userModle from "@/app/models/userModle";

export async function POST(request){
try {
    connectToDatabase();
    const cookie =await cookies();
    const formData = await request.formData();
    const PrivesImage = formData.get("image")
   const file = formData.get('file');
   const byt = await file.arrayBuffer();
   const buffer = Buffer.from(byt)
  const basePath = `/${Date.now()}-${uuidv4()}-${file.name}`
  const uplodePath = `public/profile-images/${basePath}`
  const dbPath = `profile-images/${basePath}`
  await fs.writeFile(uplodePath,buffer);
  const token = await cookie.get('token').value;


    if(token){
       const email = await jwt.verify(token,process.env.JWT_SECRET);
      const currentuser = await userModle.findOne({email}).select('-password');
    if(currentuser.profileImage){
     await fs.unlink(`${"public/"}${PrivesImage.replace("//","/")}`);
    }
      currentuser.profileImage = dbPath;
      currentuser.save();
      return NextResponse.json({currentuser})
    }
  return NextResponse.json({error:'some thing want wrong to uploding profile image'});
} catch (error) {
    console.log('some thing want wrong to uploding image');   
}
}