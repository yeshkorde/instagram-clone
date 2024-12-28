'use client'
import { useState,useEffect } from 'react'
import axios from 'axios'

function LikedPostBlock() {
  return (
    <div className="columns-4 mx-auto pb-4 h-full w-full">
    <div>
      <div className="relative mb-4 break-inside-avoid rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer">
        <img 
          src='https://i.pinimg.com/236x/85/2a/62/852a6288c9b1b8613cab1343e3d7637c.jpg' 
          alt="post" 
          className='max-w-[300px] object-cover rounded-lg'
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white font-medium">View Post</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LikedPostBlock