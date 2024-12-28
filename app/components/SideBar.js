'use client'
import React,{useState,useEffect,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut,faSpinner  } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Link from 'next/link';
import SearchInput from './SearchInput';
import UserCard from './UserCard';
import UserCardSkeleton from './Skeletons/UserCardSkeleton';
import { usePathname,useRouter } from 'next/navigation';


function SideBar() {
const {ison,setison} = useContext(UserContext)

  const context = useContext(UserContext);
  const [isSearchingOn, setisSearchingOn] = useState(false)
  const [isNotifactionOn, setisNotifactionOn] = useState(false)
  const userdata = useContext(UserContext)
   const [searchedUsers, setsearchedUsers] = useState([]);
  const [searchLoding, setsearchLoding] = useState(false)
  const path = usePathname()
  const router = useRouter();


const Logout = async()=>{
  try {
    const response = await axios.get('api/auth/LogOut');
    if(response.data.error){
      alert(response.data.error)
    }
    if(response.data.sucess){
    router.refresh();
    }
  } catch (error) {
    console.log("error to logout user ", error.message);
    
  }
}

const cahngeNotification=()=>{
    if(isSearchingOn){
        setisSearchingOn(false);
        setisNotifactionOn(true)
        setison(isNotifactionOn || isSearchingOn ? false :true)
    }
    else{
        setisNotifactionOn((prev)=>!prev)
        setison(isNotifactionOn || isSearchingOn ? false :true)
    }
}

const changeSearch = ()=>{
    if(isNotifactionOn){
        setisNotifactionOn(false);
        setisSearchingOn(true)
        setison(isNotifactionOn || isSearchingOn ? false :true)
    }
    else{
        setisSearchingOn((prev)=>!prev)
        setison(isNotifactionOn || isSearchingOn ? false :true)
    }
}



useEffect(() => {
context.getUserData();
setison(isNotifactionOn || isSearchingOn ? true : false)
}, [context.lodingProfileImages])







  return (
    <div className='h-screen fixed w-[30%] z-[9999] text-white '>
        <div className={`absolute h-full ${isNotifactionOn?"translate-x-0":"translate-x-[-600px]"} w-full transition-all duration-500   bg-black rounded-r-3xl border-r border-[#1e1e1e] `}>
          </div> 
        <div className={`absolute h-full  ${isSearchingOn?"translate-x-0":"translate-x-[-600px]"} transition-all w-full bg-black duration-500 border-r rounded-r-3xl border-[#1e1e1e] pl-24 pt-6 pr-4 overflow-x-hidden overflow-y-auto `}>
      <h1 className=' text-2xl font-sans font-semibold'>Search</h1>
      <SearchInput userData={setsearchedUsers} isLoding={setsearchLoding}/>
      <hr className='mt-8 border-[#292929] mb-4'/>
    {
      searchLoding?<div className=' flex flex-col gap-4'>
        <UserCardSkeleton/>
        <UserCardSkeleton/>
        <UserCardSkeleton/>
        <UserCardSkeleton/>
        <UserCardSkeleton/>
        <UserCardSkeleton/>
      </div>: 
        searchedUsers.length<=0?<p></p>:searchedUsers.map((user)=>(
        <UserCard userdata={user} key={user._id}/>
       ))
    }
        </div>
        <div className={`absolute h-full ${isNotifactionOn || isSearchingOn ? "w-[18%]" :'w-[53%] border-r border-[#171717] '} transition-all duration-300 bg-black flex items-center flex-col  px-2 py-2`}>
        <Link href={'/'}>
        <div className="pt-6 pr-16 ">
         {
          isNotifactionOn || isSearchingOn ?<svg aria-label="Instagram" className="x1lliihq x1n2onr6 x5n08af ml-14" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path></svg>:<img src="/images/remove bg.png" alt="" srcset="" className='h-[41px] mr-7'/>
         }
          </div>
          </Link>
          <div className="flex flex-col pt-8 w-full px-[1px] gap-2" >
          <Link href={'/'}>
            <div className={`flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer ${path==="/"?"bg-[#181818]":""}`}>
            <svg aria-label="Home" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            <p className={`font-semibold relatve top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Home</p>
            </div>
            </Link>
            <div onClick={changeSearch} className="flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer">
            <svg aria-label="Search" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            <p className={`text-[16px] relativ top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""} `}>Search</p>
            </div>
            <div className="flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer">
            <svg aria-label="Explore" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Explore</p>
            </div>
         <Link href={"/reel"}>
         <div className={`flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer ${path==="/reel"?"bg-[#181818]":""}`}>
            <svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z" fill-rule="evenodd"></path></svg>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Reels</p>
            </div>
         </Link>
         <Link href={"/messages"}>
            <div className={`flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer ${path==="/messages"?"bg-[#181818]":""}`}>
            <svg aria-label="Messenger" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Messages</p>
            </div>
            </Link>
            <div onClick={cahngeNotification} className="flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer">
            <svg aria-label="Notifications" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Notifications</p>
            </div>
         <Link href={'/create'}>
         <div className={`flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer ${path==="/create"?"bg-[#181818]":""}`}>
            <svg aria-label="New post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Create</p>
            </div>
         </Link>
           <Link href={'/profile'}> <div  className={`flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer ${path==="/profile"?"bg-[#181818]":""}`}>
            <div className="h-7 w-7 rounded-full bg-white ">
              <img src={context.userdata?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"} alt=""  className='h-full w-full rounded-full object-cover object-top '/>
            </div>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Profile</p>
            </div></Link>
            <div onClick={Logout} className="flex  gap-4 w-full py-3 items-center hover:bg-[#181818] transition-all duration-500 px-4 rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faSignOut} className='text-xl'/>
            <p className={` relative top-[2px] ${isNotifactionOn || isSearchingOn ? "hidden":""}`}>Logout</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SideBar