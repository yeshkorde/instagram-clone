"use client";
import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faHeart, faComment, faCommentAlt, faCommentMedical, faCommentDollar } from "@fortawesome/free-solid-svg-icons";
function SavedPostBlock() {
  const [SavedPost, setSavedPost] = useState([]);
  const [SavedPostIsLoding,setSavedPostIsLoding] = useState(false);

  const getAllSavedPostes = async () => {
    try {
      setSavedPostIsLoding(true);
      const res = await axios.get("/api/posts/GetAllSavedPostes");
      setSavedPost(res.data[0].saved);
      setSavedPostIsLoding(false)
    } catch (error) {
      console.log(error.message);
      setSavedPostIsLoding(true)
    }
  };

 

  useEffect(() => {
    getAllSavedPostes();
  }, []);

  if (SavedPostIsLoding) {
    return (
      <div className="h-80 w-full flex justify-center items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-3xl animate-spin text-[#5b5b5b]"
        />
      </div>
    );
  }

  return (
    <div className="columns-4 mx-auto pb-4 h-full w-full">
      {SavedPost.map((post, id) => {
        return (
          <div key={id}>
            <div className="relative mb-4 break-inside-avoid rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer">
              <img
                src={post.images[0]}
                alt="post"
                className="max-w-[300px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="flex items-center justify-center h-full w-full">
             <div className="flex gap-1">
             <FontAwesomeIcon icon={faCommentAlt} className="text-2xl text-white flex" />
             <p className="text-white">{post?.comments?.length}</p>
             </div>
             </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SavedPostBlock;
