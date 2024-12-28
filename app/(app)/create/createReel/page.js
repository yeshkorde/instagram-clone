"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  faUpload,
  faPause,
  faPlay,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { UserContext } from "@/app/context/userContext";
function CreateReel() {
  const context = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [videoIcon, setVideoIcon] = useState(faPlay);
  const [playBarWidth, setPlayBarWidth] = useState(0);
  const videoRef = useRef();
  const inputRef = useRef();
  const path = usePathname();
  const [videoType, setVideoType] = useState(false);

  const [data, setData] = useState({
    caption: "",
    description: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const VideoTypes = [
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "video/3gpp",
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (VideoTypes.includes(selectedFile.type)) {
      setVideoType(true);
      setFile(selectedFile);
      const videoUrl = URL.createObjectURL(selectedFile);
      setUrl(videoUrl);
      inputRef.current.value = "";
      setVideoDuration(null);
      setIsPaused(false);
    } else {
      setVideoType(false);
    }
  };

  const handleVideoPlay = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      videoRef.current.pause();
      setVideoIcon(faPlay);
    } else {
      videoRef.current.play();
      setVideoIcon(faPause);
    }
  };

  const handleLoad = (e) => {
    const videoElement = e.target;
    videoElement.addEventListener("durationchange", function () {
      videoElement.style.aspectRatio = 9 / 16;
      if (videoElement.duration >= 50) {
        setVideoDuration(true);
      } else {
        setVideoDuration(false);
      }
    });
  };

  useEffect(() => {
    if (isPaused) {
      const interval = setInterval(() => {
        const t =
          (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
        const current = Math.floor(t);
        setPlayBarWidth(current);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handleCreateReel = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", data.caption);
      formData.append("description", data.description);
      formData.append("link", data.link);
      const response = await axios.post("/api/Reels/Create-Reel", formData);
      console.log(response.data);
      setData({ caption: "", description: "", link: "" });
      setUrl("");
      setFile(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  

console.log(context.userdata);


  return (
    <div className="h-full w-full px-4 py-4 pt-10 text-white">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <div className="w-full flex justify-start mt-4 mb-20 gap-10 items-center px-10">
        <Link href="/create">
          <button
            className={`text-sm font-semibold py-2 px-4 rounded-xl ${
              path === "/create"
                ? "bg-white text-black"
                : "bg-[#0c0c0c] text-white"
            }`}
          >
            Create Post
          </button>
        </Link>
        <Link href="/create/createReel">
          <button
            className={`text-sm font-semibold py-2 px-4 rounded-xl ${
              path === "/create/createReel"
                ? "bg-white text-black"
                : "bg-[#0c0c0c] text-white"
            }`}
          >
            Create Reel
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-between items-center pr-20 ">
        <div className="h-20 w-20 rounded-full relative flex justify-center items-center ">
          <div className="h-[85px] w-[85px] absolute bg-gradient-to-tr from-yellow-500 via-pink-500  to-purple-700 animate-spin rounded-full flex justify-center items-center p-2 "></div>
          <div className="h-full w-full absolute bg-black rounded-full flex justify-center items-center">
            <img
              src={
                `/${context?.userdata?.profileImage?.replace("//", "/")}` ||
                "/images/44884218_345707102882519_2446069589734326272_n.jpg".replace("//", "/")
              }
              alt="profileimage"
              className=" w-full h-full object-cover  rounded-full"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="h-10 w-10 rounded-full relative flex justify-center items-center">
            <div className="h-full w-full absolute bg-gradient-to-tr  from-yellow-500 via-pink-500 to-purple-700 animate-spin rounded-full flex justify-center items-center p-1 ">
              <div className="h-full w-full bg-black rounded-full flex justify-center items-center">
                <div className="h-3 w-4 bg-black rounded-l-full translate-x-3 "></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="h-20 w-20 rounded-full relative flex justify-center items-center"
            onClick={() => inputRef.current.click()}
          >
            <div className="h-[50px] w-[50px] absolute bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-700 animate-spin rounded-full flex justify-center items-center p-2 "></div>
            <div className="h-11 text-white w-11 absolute bg-black rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faUpload}
                className="text-lg font-extrabold"
              />
            </div>
          </div>
        )}
      </div>
      {url && (
        <div className="h-full w-full flex justify-center items-center gap-2 px-20">
          {videoDuration ? (
            <div className="w-full h-full flex justify-center items-center  text-white p-4 rounded-lg">
              <div className="py-4 w-full rounded-lg bg-[#0c0c0c] flex justify-center items-center gap-2">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-xl font-extrabold text-red-500"
                />
                <h1 className="text-sm font-semibold">
                  Video is longer than 50 seconds please use a shorter video
                </h1>
              </div>
            </div>
          ) : videoType ? (
            <>
              <div className="w-1/2 h-full mt-[120px]">
                <div
                  className="h-[80] w-[380px] justify-center items-center flex relative bg-[#0c0c0c] rounded-lg mb-10"
                  style={{ aspectRatio: 9 / 16 }}
                >
                  <div className="absolute h-full w-full flex justify-center">
                    <video
                      className="rounded-lg"
                      src={url}
                      ref={videoRef}
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                      onLoadStart={handleLoad}
                    >
                      <div>logo</div>
                    </video>
                  </div>
                  <button
                    className="px-4 py-2 absolute"
                    onClick={handleVideoPlay}
                  >
                    <div className="h-10 w-10 rounded-full hover:bg-black hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center">
                      <FontAwesomeIcon icon={videoIcon} />
                    </div>
                  </button>
                </div>
                <div className="w-full z-10">
                  <div
                    className={`h-1 bg-white rounded-lg transition-all -translate-y-11 duration-75`}
                    style={{ aspectRatio: 9 / 16, width: `${playBarWidth}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-full h-full flex justify-center px-10 items-center mt-[120px]">
                <div className="h-full w-full bg-[#000] rounded-lg flex flex-col px-4 py-4 gap-10">
                  <h1 className="text-xl font-semibold">Create Reel</h1>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold ml-2">
                      Caption
                    </label>
                    <input
                      value={data.caption}
                      onChange={(e) =>
                        setData({ ...data, caption: e.target.value })
                      }
                      type="text"
                      className="bg-transparent outline-none border-b px-4 h-12 border-[#262626] text-white text-sm placeholder:text-[#666666] placeholder:text-sm"
                      placeholder="Add a caption..."
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold ml-2">
                      Description
                    </label>
                    <textarea
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                      className="bg-transparent outline-none border-b px-4 h-12 border-[#262626] text-white text-sm placeholder:text-[#666666] placeholder:text-sm"
                      placeholder="Add a description..."
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-semibold ml-2">Link</label>
                    <input
                      value={data.link}
                      onChange={(e) =>
                        setData({ ...data, link: e.target.value })
                      }
                      type="text"
                      className="bg-transparent outline-none border-b px-4 h-12 border-[#262626] text-white text-sm placeholder:text-[#666666] placeholder:text-sm"
                      placeholder="Add a link..."
                    />
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      className="w-full bg-[#0c0c0c] text-white px-4 py-2 rounded-xl text-sm font-semibold"
                      onClick={handleCreateReel}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white p-4 rounded-lg">
              <div className="py-4 w-full rounded-lg bg-[#0c0c0c] flex justify-center items-center gap-2">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-xl font-extrabold text-red-500"
                />
                <h1 className="text-sm font-semibold">
                  It is not a video file please upload a video file
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateReel;
