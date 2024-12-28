"use client";
import React from "react";
import Slider from "./Slider";
import { useState, useRef, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HoverCardContentBox from "./HoverCardContentBox";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import GetPostTime from "../utils/GetPostTime";
import LikePost from "./LikePost";
import { postcontext } from "../context/PostCoxtex";
import { useContext } from "react";
import SavePostButten from "./SavePostButten";

function PostComponent({ post, setPost, setShowCommentBox,setPostId,showCommentBox }) {
  const {getPostData}=useContext(postcontext)
  const [commentLoading, setcommentLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
const [likes,setLikes] = useState(post.Likes.length)
  const inputRef = useRef();
  const [comment, setComment] = useState("");
 
 
  const handlePost = async () => {
    try {
      setcommentLoading(true);
      const res = await axios.post("/api/comments/CreateComment", {
        comment,
        postId: post._id,
      });
      setComment("");
      inputRef.current.value = "";
      setcommentLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setcommentLoading(false);
    }
  };

  const handleViewAllComments=()=>{
    setPostId(post._id)
    setShowCommentBox(true)
  }



  return (
    <div className="max-w-[800px] mx-auto bg-black shadow-md mb-6 text-white rounded-xl">
      <div className="flex items-center p-4 mb-4">
        <HoverCard openDelay={200} closeDelay={200} className="bg-black p-0">
          <HoverCardTrigger>
            <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
              <img
                src={
                  post.user[0]?.profileImage ||
                  "/images/44884218_345707102882519_2446069589734326272_n.jpg"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="shadow-lg shadow-[#ffffff2f] bg-black rounded-xl border-none h-full w-full translate-x-[160px] p-0">
            <HoverCardContentBox postData={post} />
          </HoverCardContent>
        </HoverCard>
        <div className="ml-3 flex-grow">
          <p className="font-semibold text-sm text-white">
            {post.user[0].username}
          </p>
          <p className="text-xs text-gray-400">{post.user[0].email}</p>
        </div>
        <p className="text-gray-400 text-[12px]">
          {GetPostTime(post.createdAt)}
        </p>
      </div>
      <div className="flex justify-center">
        <Slider images={post.images} />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex gap-4">
            <LikePost
              postId={post._id}
              isloading={isloading}
              setIsloading={setIsloading}
              setLikes={setLikes}
            />
            <button className="text-white">
              <svg
                aria-label="Comment"
                class="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </button>
            <button className="text-white">
              <svg
                aria-label="Share"
                class="x1lliihq x1n2onr6 xyb1xck"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Share</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                ></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></polygon>
              </svg>
            </button>
          </div>
          <SavePostButten postId={post._id}/>
        </div>
        <p className="font-semibold text-sm mt-2 text-white">{likes} likes</p>
        <div className="mt-2">
          <span className="font-semibold text-sm mr-2 text-white">
            {post.user.username}
          </span>
          <span className="text-sm text-gray-300">{post.caption}</span>
        </div>
        <p className="text-gray-400 text-sm mt-2 cursor-pointer" onClick={handleViewAllComments}>
          View all {post.comments.length} comments
        </p>
      </div>
      <div className="px-4 border-b border-[#474747c0] pb-2 flex items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a comment..."
          className="w-full outline-none bg-transparent text-white text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment &&
          (commentLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin text-blue-500"
            />
          ) : (
            <button
              className="text-blue-500 transition-all"
              onClick={handlePost}
            >
              Post
            </button>
          ))}
      </div>
    </div>
  );
}

export default PostComponent;
