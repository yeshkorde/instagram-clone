"use client"
import React, { useEffect, useState } from 'react'
import HoverBoxSkeleton from './Skeletons/HoverBoxSkeleton'
import FollowBtn from './FollowBtn';
function HoverCardContentBox({postData}) {


const [userData,setUserData] = useState(null);  

const [loading,setLoading] = useState(true);  

const getUserData = async()=>{
  setLoading(true);
  const res = await fetch(`/api/posts/GetPostUsersData?userId=${postData.user[0]._id}`);
  const data = await res.json();
  setUserData(data.user);
  console.log(data.user);
  setLoading(false);
}

useEffect(()=>{
  getUserData();
},[])

if(loading){
  return <HoverBoxSkeleton/>
}

  return (
    <div className='w-[400px] h-[400px]'>
      <div className='w-full flex  p-4'>
     <div className='flex items-center justify-center'>
     <div className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center'>
        <img src={userData?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"} alt="profile" className='w-full h-full object-cover' />
      </div>
     </div>
       <div className='flex flex-col ml-6 items-start justify-center'>
        <p className='text-white text-lg font-extrabold'>{userData?.username}</p>
        <p className='text-gray-400 text-sm'>{userData?.email}</p>
       </div>
      </div>
     <div className='w-full px-14 mt-2 flex justify-between'>
<div className='flex items-center flex-col '>
  <p className='text-white text-lg font-extrabold'>{userData?.posts.length}</p>
  <p className='text-white text-[13px] font-thin'>Posts</p>
</div>
<div className='flex items-center flex-col '>
  <p className='text-white text-lg font-extrabold'>{userData?.followers.length}</p>
  <p className='text-white text-[13px] font-thin'>Followers</p>
</div>
<div className='flex items-center flex-col '>
  <p className='text-white text-lg font-extrabold'>{userData?.following.length}</p>
  <p className='text-white text-[13px] font-thin'>Following</p>
</div>
     </div>
<div className='w-full  px-2 mt-4 flex gap-1 '>
{
userData?.posts.length >= 3 ? (
<>
<img src={userData?.posts[0].images[0]} alt="post" className='w-[125px] h-[180px] rounded-md object-cover'/>
<img src={userData?.posts[1].images[0]} alt="post" className='w-[125px] h-[180px] rounded-md object-cover'/>
<img src={userData?.posts[2].images[0]} alt="post" className='w-[125px] h-[180px] rounded-md object-cover'/>
</>
) : userData?.posts.map((post)=>(
  <img key={post._id} src={post.images[0]} alt="post" className='w-[125px] h-[180px] rounded-md object-cover'/>
))
}
</div>
<div className='w-full   px-2 mt-2'>
 <FollowBtn followerId={userData._id} size={"full"}/>
</div>
    </div>
  )
}

export default HoverCardContentBox;