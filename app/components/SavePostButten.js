"use client";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function SavePostButten({ postId }) {
  const { userdata, getUserData } = useContext(UserContext);
  const [isSaved, setisSaved] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleClick = async () => {
    try {
      setisLoading(true);
      const res = await axios.post("/api/posts/SavePost", { postId });
      console.log(res.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log("some thing want wrong to save post ", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isLoading]);
  return (
    <div onClick={handleClick} className="text-white cursor-pointer">
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white font-extrabold text-xl" />
      ) : userdata?.saved?.includes(postId) ? (
        <svg
          aria-label="Remove"
          class="x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
        </svg>
      ) : (
        <svg
          aria-label="Save"
          className="cursor-pointer x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <polygon
            fill="none"
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polygon>
        </svg>
      )}
    </div>
  );
}

export default SavePostButten;
