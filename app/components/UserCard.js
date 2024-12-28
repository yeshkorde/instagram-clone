"use client"
import React from 'react'
import FollowBtn from './FollowBtn'
function UserCard({userdata}) {
  return (
    <div class="h-16 w-full p-2  flex justify-between items-center" >
         <div class="flex gap-4 justify-center items-center">
          <div class="h-14 w-14 bg-red-600 rounded-full">
          <img src={userdata?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"} alt="" className='w-full h-full object-cover  rounded-full' />
          </div>
          <div class=" flex flex-col">
            <p className='text-[14px] font-semibold'>{userdata.username}</p>
            <p className='text-[10px] text-[#c7c7c7]'>Followers  {userdata.followers.length}</p>
          </div>
          </div>
          <FollowBtn followerId ={userdata._id} />
         </div>
  )
}

export default UserCard