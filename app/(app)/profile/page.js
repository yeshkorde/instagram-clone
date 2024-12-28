"use client"
import ProfileImage from '@/app/components/ProfileImage'
import { UserContext } from '@/app/context/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faX } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef,useContext,useState } from 'react'
import axios from 'axios';
import UserCard from '@/app/components/UserCard';
import PostBlock from '@/app/components/postBlock';
import SavedPostBlock from '@/app/components/savedPostBlock';
import LikedPostBlock from '@/app/components/LikedPostBlock';
import ReelsBlock from '@/app/components/ReelsBlock';
 function Profile(){

  const sliderRef = useRef(null);
  const context = useContext(UserContext);

  const [postType, setpostType] = useState(<PostBlock/>)
  const [isFollowingOn, setisFollowingOn] = useState(false);
  const [followersOrfollowing, setfollowersOrfollowing] = useState('')
  const [isloding, setisloding] = useState(true)
  const [followersData, setfollowersData] = useState([])


  useEffect(() => {
  context.getUserData();
  }, [context.lodingProfileImages,isloding])
  
  

const GetPostes  = async(e)=>{
  try {
    setpostType(<PostBlock/>)
    sliderRef.current.classList.add('translate-x-[360px]')
    sliderRef.current.classList.remove('translate-x-[500px]')
    sliderRef.current.classList.remove('translate-x-[772px]')
    sliderRef.current.classList.remove("translate-x-[635px]")
  } catch (error) {
    
  }
}

const GetSavedPostes = ()=>{
  try {
    setpostType(<SavedPostBlock/>)
    sliderRef.current.classList.add('translate-x-[500px]')
    sliderRef.current.classList.remove('translate-x-[360px]')
    sliderRef.current.classList.remove('translate-x-[772px]')
    sliderRef.current.classList.remove("translate-x-[635px]")
  } catch (error) {
    
  }
}

const GetLikedPostes = ()=>{
  try {
    setpostType(<LikedPostBlock/>)
    sliderRef.current.classList.remove('translate-x-[360px]')
    sliderRef.current.classList.remove('translate-x-[500px]')
    sliderRef.current.classList.add('translate-x-[772px]')
    sliderRef.current.classList.remove("translate-x-[635px]")
  } catch (error) {
    
  }
}

const getReels=()=>{
  setpostType(<ReelsBlock/>)
  sliderRef.current.classList.add("translate-x-[635px]")
  sliderRef.current.classList.remove('translate-x-[360px]')
  sliderRef.current.classList.remove('translate-x-[500px]')
  sliderRef.current.classList.remove('translate-x-[772px]')
}

const handleFollowers=async()=>{
  setisloding(true)
    setisFollowingOn(true)
    setfollowersOrfollowing('Followers')
    const responce = await axios.post(`api/user/get-followersData`,{data:'followers'});
    setfollowersData(responce.data.followers)
  setisloding(false)
}

const handleFollowing=async ()=>{
  setisloding(true)
  setisFollowingOn(true)
  setfollowersOrfollowing('Followings')
  const responce = await axios.post(`api/user/get-followersData`,{data:'following'});
  setfollowersData(responce.data.following)
  setisloding(false)
}

  return (
   <div className="h-full w-full relative text-white">
    <div className="h-full w-full flex flex-col px-4 pt-14 absolute">
    <div className="flex  px-14 gap-4 ">
    <ProfileImage/>
  <div className="ml-20 mt-2">
   <div className="flex gap-10">
   <p className='text-2xl '>{context.userdata.username}</p>
   <button className=' text-[12px] px-8 py-1 bg-[#202020] font-semibold rounded-lg'>Edit Profile</button>
   </div>
   <div className="flex mt-6 gap-10">
    <p className='text-[16px]'>{context.lengths.postesLength} posts</p>
    <p className='text-[16px] cursor-pointer ' onClick={handleFollowers}> {context.lengths.followersLength} followers</p>
    <p className='text-[16px] cursor-pointer' onClick={handleFollowing}>{context.lengths.followingLength} following</p>
   </div>
   <p className='text-[12px] mt-6'>{context.userdata.bio?context.userdata.bio:"set your bio"}</p>
  </div>
    </div>
    <div className="w-full h-full mt-20 ">
      <div className="py-[1px] w-10 bg-white relative translate-x-[360px] transition-all duration-500 rounded-full" ref={sliderRef}></div>
    <div className="h-5 w-full border-t py-6 border-[#161616] px-4 flex justify-center gap-20 items-center">
     <div className="flex items-center justify-center gap-2 cursor-pointer " onClick={GetPostes}>
     <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af text-[#a0a0a0]" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
    <p className='text-[12px] text-[#a0a0a0]'>POSTS</p>
     </div>
     <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={GetSavedPostes}>
     <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4 text-[#a0a0a0]" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
    <p className='text-[12px] text-[#a0a0a0]'>SAVED</p>
     </div>
     <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={getReels}>
     <svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af text-[#a0a0a0] " fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Reels</title><path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z" fill-rule="evenodd"></path></svg>
    <p className='text-[14px] text-[#a0a0a0]'>Reels</p>
     </div>
     <div className="flex items-center justify-center gap-2 cursor-pointer"  onClick={GetLikedPostes}>
     <svg aria-label="Notifications" className="x1lliihq x1n2onr6 x5n08af text-[#a0a0a0]" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Notifications</title><path d="M17.075 1.987a5.852 5.852 0 0 0-5.07 2.66l-.008.012-.01-.014a5.878 5.878 0 0 0-5.062-2.658A6.719 6.719 0 0 0 .5 8.952c0 3.514 2.581 5.757 5.077 7.927.302.262.607.527.91.797l1.089.973c2.112 1.89 3.149 2.813 3.642 3.133a1.438 1.438 0 0 0 1.564 0c.472-.306 1.334-1.07 3.755-3.234l.978-.874c.314-.28.631-.555.945-.827 2.478-2.15 5.04-4.372 5.04-7.895a6.719 6.719 0 0 0-6.425-6.965Z"></path></svg>
    <p className='text-[12px] text-[#a0a0a0]'>LIKED</p>
     </div>
    </div>
  {postType}
    </div>
    </div>
    <div className={`absolute h-screen w-full flex justify-center items-center ${isFollowingOn?"":"hidden"} `}>
     <div className="h-[70%] w-[30%] bg-[#181818] rounded-2xl shadow-2xl mr-20 flex flex-col">
      <div className="px-4 flex justify-end py-2 cursor-pointer border-b border-[#242424]">
        <FontAwesomeIcon  icon={faX} className='text-sm text-[#606060]' onClick={()=>setisFollowingOn(false)}/>
      </div>
      <div className="flex justify-center items-center mt-2">
        <p>{followersOrfollowing}</p>
      </div>
      <div className="h-[85%] w-full  rounded-b-2xl mt-2">
       {
        followersData.map((user)=>(
         isloding?<div className='h-full w-full flex justify-center items-center' key={user._id}>
        <FontAwesomeIcon icon={faSpinner} className=' animate-spin text-white text-2xl'/>
         </div>: <UserCard userdata={user} key={user._id}/>
        ))
       }
      </div>
     </div>
    </div>
   </div>
  )
 }

export default Profile;