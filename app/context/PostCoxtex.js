"use client";
import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

export const postcontext = createContext();

const PostContextProvider = ({ children }) => {
  const [postes, setPostes] = useState([]);
  const [postLoding, setpostLoding] = useState(true);
  const[likes,setLikes]=useState(0)

  const getPostes = async () => {
  try{
  setpostLoding(true)
    const res = await axios.get("/api/posts/Show-Postes");
    setPostes(res.data);
setpostLoding(false)
  }catch(err){
    setPostes(true)
console.log("some thing want wrong to geting the postes " ,err.message);
  }
  };



  const value = {
    postes,
    getPostes,
    postLoding,
    likes,
    setLikes
  };
  return <postcontext.Provider value={value}>{children}</postcontext.Provider>;
};

export default PostContextProvider;
