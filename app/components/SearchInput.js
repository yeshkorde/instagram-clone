"use client"
import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function SearchInput({userData,isLoding}) {
const inputRef = useRef()
  const search = async(e)=>{
    try {
      isLoding(true)
      const responce = await axios.post(`api/user/search-User?text=${e.target.value}`);
      if(!e.target.value){
        userData([])
      }
      if(responce.data.users){
        userData(responce.data.users)
      }
      isLoding(false)
    } catch (error) {
      console.log('some thing want wrong to searching user  ' ,error.message);
      isLoding(false)
    }
  }
  

  useEffect(()=>{

  },[inputRef])
 

  return (
   <div class="h-10 w-full mt-8 flex ">
  <input type="text" className='w-[90%] h-10 rounded-l-lg  px-2 outline-none bg-[#333] placeholder:font-sans' placeholder='Search' onInput={search} ref={inputRef}/>
  <div class="h-full w-[10%] bg-[#333] rounded-r-lg flex justify-center items-center">
    <div class="h-4 w-4 bg-[#d7d7d7] rounded-full flex justify-center items-center cursor-pointer" onClick={()=>inputRef.current.value = ''}>
       <FontAwesomeIcon icon={faX} className='text-[10px] font-extrabold text-[#333] ' />
    </div>
  </div>
   </div>
  )
}

export default SearchInput