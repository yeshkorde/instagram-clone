"use client"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
function FollowBtn({followerId,size}) {    
  const context = useContext(UserContext);
const [isLoding, setisLoding] = useState(false)

  const followThem = async () => {
    try {
      setisLoding(true)
      const response = await axios.post(`api/user/follow-user?follower=${followerId}`);
      console.log(response.data);
      setisLoding(false)
    } catch (error) {
      console.log('some thing want to following user');
    }
  }

useEffect(()=>{
context.getUserData();
},[isLoding])

  return (
    isLoding?<div className={`px-8 py-2  bg-blue-600 rounded-lg font-semibold text-[12px] flex justify-center items-center`}>
    <FontAwesomeIcon icon={faSpinner} className='animate-spin text-lg text-white'/>
    </div>:
    context.userdata._id === followerId ?"":<button className={`px-8 py-2 ${size?`w-${size}`:""} bg-blue-600 rounded-lg font-semibold text-[12px]`} onClick={followThem}>{context.userdata.following.indexOf(followerId) == -1 ?"Follow":"UnFollow"}</button>
  )
}

export default FollowBtn