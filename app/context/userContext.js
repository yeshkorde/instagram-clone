"use client"

import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()


const UserContextProvider =({children})=>{
    
const [userdata, setuserdata] = useState('');
const [isloding, setisloding] = useState('');
const [ison, setison] = useState(false)

const [lodingProfileImages, setlodingProfileImages] = useState(false)
const [lengths, setlengths] = useState({
  followersLength:'',
  postesLength:'',
  followingLength:''
})
const getUserData = async()=>{

  try {
    setisloding(true)
    const response = await axios.get('/api/user/get-me');
    setlengths(prev=>({...prev,followersLength : response.data.currentuser.followers.length,
      followingLength:response.data.currentuser.following.length,
      postesLength:response.data.currentuser.posts.length,
    }))
    
    
  if(response.data.currentuser){
    setuserdata(response.data.currentuser)
  }
  setisloding(false)
  } catch (error) {
    console.log('some thing want to geting user data ');
    
  }
}

const value = {
getUserData,
userdata,
isloding,
lengths,
setlodingProfileImages,
lodingProfileImages,
setison,
ison,
}

return(
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
)
}



export default UserContextProvider