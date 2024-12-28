"use client";

import { useContext, useEffect,useState } from "react";
import { UserContext } from "../context/userContext";
import StoryBlock from "../components/StoryBlock";
import PostComponent from "../components/PostComponent";
import { postcontext } from "../context/PostCoxtex";
import PostesSkeleton from "../components/Skeletons/PostesSkeleton";
import CommentBox from "../components/CommentBox";

export default function Home() {
  const context = useContext(UserContext);
  const postContext = useContext(postcontext);
  const [showCommentBox,setShowCommentBox]=useState(false)
  const [post,setPost]=useState(null)
  const[postId,setPostId]=useState("")


  useEffect(() => {
    context.getUserData();
    postContext.getPostes();
  }, [context.setlodingProfileImages,]);



  return (
    <div className="relative h-full w-full">
      <CommentBox showCommentBox={showCommentBox} setShowCommentBox={setShowCommentBox} post={post} postId={postId} />
      <div className="relative z-20 h-full w-full flex">
        <div className="h-screen w-[70%] flex flex-col ">
          <div className="h-full w-full pt-4">
            {postContext.postLoding ? (
             <PostesSkeleton/>
   
            ) : (
              <div className="h-full w-full px-[15%] pb-12">
                <StoryBlock />
                {postContext.postes.map((post) => (
                  <PostComponent key={post._id} post={post} setPost={setPost} setShowCommentBox={setShowCommentBox} showCommentBox={showCommentBox} setPostId={setPostId} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="h-screen w-[30%] flex flex-col items-start">
          <div className="h-28 w-full flex items-center px-6">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={
                  context.userdata?.profileImage ||
                  "/images/44884218_345707102882519_2446069589734326272_n.jpg"
                }
                alt="profileimage"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="flex flex-col ml-4 flex-grow">
              <p className="text-sm font-semibold text-white">
                {context.userdata?.username}
              </p>
              <p className="text-[14px] text-gray-500">
                {context.userdata?.email}
              </p>
            </div>
            <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">
              Switch
            </button>
          </div>
          <p className="text-gray-500 text-sm font-semibold ml-6">
            Suggested for you
          </p>
        </div>
      </div>
    </div>
  );
}
