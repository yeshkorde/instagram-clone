"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { postcontext } from "../context/PostCoxtex";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostBlock() {
  const [AllPostes, setAllPostes] = useState([]);
  const [isloding, setisloding] = useState(false);

  const GetAllPostes = async () => {
    try {
      setisloding(true);
      const res = await axios.get("/api/posts/GetAllPostes");
      setAllPostes(res.data.posts);
      setisloding(false);
    } catch (error) {
      console.log("some thing want wrong to get postes ", error.message);
      setisloding(true);
    }
  };

  useEffect(() => {
    GetAllPostes();
  }, []);

  if (isloding) {
    return (
      <div className="h-80 w-full flex justify-center items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-3xl animate-spin text-[#5b5b5b]"
        />
      </div>
    );
  }

  if (AllPostes.length === 0) {
    return (
      <div className="h-80 w-full flex justify-center items-center flex-col gap-4">
        <p className="text-xl font-bold text-[#ffffff]">No Postes Yet</p>
        <Link href={"/create"}>
          <button className="bg-white text-black px-2 py-2 font-semibold rounded-md">
            Create Post
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="columns-4 mx-auto mb-10 h-full w-full">
      {AllPostes.map((item) => (
        item.images.length > 0 ? (
          <div key={item._id}>
            <div className="relative mb-4 break-inside-avoid rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer">
              <img
                src={item.images[0]}
                alt="post"
                className="max-w-[300px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity transition-duration-500 flex items-center justify-center">
                <div className="text-white font-medium">View Post</div>
              </div>
            </div>
          </div>
        ) : null
      ))}
    </div>
  );
}

export default PostBlock;
