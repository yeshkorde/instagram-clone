import { NextResponse } from "next/server";
import fs from  "fs/promises"
import { v4 as uuidv4 } from "uuid";
import GetCurrentUser from "@/app/utils/GetCurrentUser";
import postModle from "@/app/models/postModle";

export async function POST(request){
  try {
    const form = await request.formData();
    const textContent = JSON.parse(form.get('text'))
    const file =  Array.from(form).flat().filter((file)=>{
      if(typeof(file) === "object"){
        return file
      }
    })

const dbUrl = await Promise.all(file.map(async(file)=>{
  const basePath = `/${Date.now()}-${uuidv4()}-${file.name}`
  const uplodePath = `public/postes-images/${basePath}`
  const dbPath = `postes-images/${basePath}`
  const byts = await file.arrayBuffer();
  const buffer = Buffer.from(byts)
  await fs.writeFile(uplodePath,buffer);
  return dbPath
}))

const currentUser = await GetCurrentUser();
const newpost = await postModle.create({
userId:currentUser._id,
images:dbUrl,
caption:textContent.caption,
discripation:textContent.discripation,
})

await currentUser.posts.push(newpost._id)
await currentUser.save();


    return NextResponse.json({message :'Post Created SucessFully' ,sucess:true})
  } catch (error) {
    console.log('somme thing want wrong to creating post error , : ', error.message);
    
  }
}