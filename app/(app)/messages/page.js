"use client";
import React, { useState, useEffect } from "react";
import { UserContext } from "@/app/context/userContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import UserMessageContaner from "@/app/components/UserMessageContaner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { io, Socket } from "socket.io-client";


const socket = io('http://localhost:3000')

function MessagesPage() {
  const { ison, userdata } = useContext(UserContext);
  const [isSearching, setisSearching] = useState(false);
  const [data,setdata]= useState(400)


  useGSAP(() => {
    if (isSearching) {
      gsap.from(".search", {
        width: "0%",
        duration: 0.3
      })
      gsap.from(".crossIcon", {
        scale: 0,
        duration: 0.2,
        delay: 0.3,
      })
    }
    if (!isSearching) {
      gsap.from(".searchIcon ", {
        scale: 0,
        duration: 0.3,
      })
    }
  }, [isSearching])


  const handleClick=()=>{
socket.emit("send",data)
  }

  useEffect(()=>{
    socket.on("get",(data)=>{
      console.log(data);
    })
    socket.on("connect1",(data)=>{
    alert(data.data)
    })
  })

  return (
    <div
      className={`flex h-full w-[148%] relative    py-2 text-white ${
        ison ? "z-0" : "z-[10000000]"
      } `}
    >
      <div className="h-full w-[25%] border-r border-[#1b1b1b] flex flex-col py-2 pr-2 ">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Chats</h1>
          <div className="h-10 w-10 rounded-full relative flex justify-center items-center ">
            <div className="h-[115%] w-[115%] absolute bg-gradient-to-tr from-yellow-500 via-pink-500  to-purple-700 animate-spin rounded-full flex justify-center items-center p-2 "></div>
            <div className="h-full w-full absolute bg-black rounded-full flex justify-center items-center">
              <img
                src={
                  userdata?.profileImage ||
                  "/images/44884218_345707102882519_2446069589734326272_n.jpg"
                }
                alt="profileimage"
                className=" searchInput w-full h-full object-cover  rounded-full object-top"
              />
            </div>
          </div>
        </div>
        {isSearching ? (
          <div className="flex mt-3  justify-center items-center gap-2">
            <input
              className="h-10 w-[90%] search outline-none font-bold rounded-xl bg-[#0b0b0b] text-[#d1d1d1] px-2 placeholder:text-[12px] placeholder:font-semibold z-[100]"
              placeholder="Search Your Friends"
              type="text"
            />
            <div className="mt-3 crossIcon  cursor-pointer mb-3 text-[10px] rounded-full h-6 w-6 text-white flex justify-center items-center bg-[#1d1d1d] " onClick={() => setisSearching(false)}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mt-3 searchIcon  cursor-pointer text-lg rounded-full h-10 w-10 text-white flex justify-center items-center bg-[#1d1d1d] " onClick={() => setisSearching(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full mt-4">
          <UserMessageContaner />
          <button className="p-2 bg-red-400" onClick={handleClick}>click me to send message</button>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
