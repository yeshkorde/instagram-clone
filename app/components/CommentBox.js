"use client";
import React from "react";
import { faX, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext, useRef } from "react";
import { postcontext } from "../context/PostCoxtex";
import { Swiper, SwiperSlide } from "swiper/react";
import GetPostTime from "../utils/GetPostTime";
import "swiper/css";
import LikePost from "./LikePost";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import SavePostButten from "./SavePostButten";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function CommentBox({ showCommentBox, setShowCommentBox, postId }) {



  const [comment, setComment] = useState("");
  const imageRef = useRef(null);
  const [postData, setPostData] = useState(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentLoading, setcommentLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    width: 0,
  });





  const handlePost = async () => {
    try {
      setcommentLoading(true);
      const res = await axios.post("/api/comments/CreateComment", {
        comment,
        postId: postData._id,
      });
      console.log(res);
      setComment("");
      inputRef.current.value = "";
      setcommentLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setcommentLoading(false);
    }
  };




  const handleImageLoad = (e) => {
    const img = e.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let newWidth, newHeight;

    // Maximum dimensions we want to allow
    const maxWidth = window.innerWidth * 0.7; // 70% of viewport width
    const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

    if (aspectRatio > 1) {
      // Image is wider than tall
      newWidth = Math.min(img.naturalWidth, maxWidth);
      newHeight = newWidth / aspectRatio;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }
    } else {
      // Image is taller than wide
      newHeight = Math.min(img.naturalHeight, maxHeight);
      newWidth = newHeight * aspectRatio;
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }
    }



    setImageDimensions({
      height: newHeight,
      width: newWidth,
    });
  };




  const getPostData = async () => {
    try {
      const res = await axios.get(
        `/api/comments/GetPostesComments?postId=${postId}`
      );
      setPostData(res.data);
      setLikes(res.data.Likes.length);
    } catch (err) {
      console.log(err.message);
    }
  };

  
  useEffect(() => {
    getPostData();
  }, [postId, showCommentBox]);

  return (
    <div
      className={`fixed inset-0  bg-[#0d0d0d48] z-[1000000000] ${
        showCommentBox ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div
        className="flex bg-black rounded-xl shadow-xl overflow-hidden "
        style={{
          width: imageDimensions.width
            ? `${imageDimensions.width + 600}px`
            : "90vw",
          height: imageDimensions.height
            ? `${imageDimensions.height + 100}px`
            : "90vh",
          maxWidth: "95vw",
          maxHeight: "90vh",
        }}
      >
        <div
          className="relative flex-shrink-0"
          style={{
            width: imageDimensions.width ? `${imageDimensions.width}px` : "50%",
          }}
        >
          {postData?.images ? (
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="h-full w-full"
            >
              {postData.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center h-full"
                >
                  <img
                    ref={imageRef}
                    src={image}
                    onLoad={handleImageLoad}
                    alt="post"
                    className="object-contain w-full h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400">No images available</p>
            </div>
          )}
        </div>

        <div className="w-[600px] flex flex-col bg-black">
          <div className="p-4 border-b border-[#1c1c1c] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr flex justify-center items-center from-[#ffd84c] via-[#ff006a] to-[#5710e5] p-[1px]">
                <div className="w-full h-full rounded-full p-[2px]">
                  <img
                    src={postData?.userId?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="text-white font-medium">
                {postData?.userId?.username}
              </span>
            </div>

            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowCommentBox(false)}
            >
              <FontAwesomeIcon icon={faX} className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {postData?.comments.map((comment, index) => (
              <div className="flex gap-3 justify-between " key={index}>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr flex justify-center items-center from-[#ffd84c] via-[#ff006a] to-[#5710e5] p-[1px]">
                    <div className="w-full h-full rounded-full p-[2px]">
                      <img
                        src={comment.userId?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">
                        {comment.userId?.username}
                      </span>
                      <span className="text-white text-sm ml-4">
                        {comment.text}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {GetPostTime(comment.createdAt)}
                    </span>
                  </div>
                </div>
                <div>
                  <svg
                    aria-label="Like"
                    className="x1lliihq x1n2onr6 xyb1xck text-white "
                    fill="currentColor"
                    height="12"
                    role="img"
                    viewBox="0 0 24 24"
                    width="12"
                  >
                    <title>Like</title>
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Interaction Section */}
          <div className="border-t border-[#1c1c1c] p-4 ">
            <div className="flex justify-between w-full">
              <div className="flex gap-4 mb-3 ">
                <LikePost
                  postId={postData?._id}
                  isloading={isLoading}
                  setIsloading={setIsLoading}
                  setLikes={setLikes}
                />
                <button className="text-white ">
                  <svg
                    aria-label="Comment"
                    class="x1lliihq x1n2onr6 x5n08af "
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
                      stroke-linejoin="round"
                      stroke-width="2"
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
              <SavePostButten postId={postId}/>
            </div>
            <div className="text-white font-medium mb-2">{likes} likes</div>
            <hr className="border-[#1c1c1c]" />
            <div className="flex items-center gap-3 mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
