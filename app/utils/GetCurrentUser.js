import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import userModle from "../models/userModle";

const GetCurrentUser = async()=>{
    const cookie =await cookies();
    const token =await cookie.get('token').value;
    if(token){
        const email = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModle.findOne({email}).select('-password');
        return user
    }
}

export default GetCurrentUser;