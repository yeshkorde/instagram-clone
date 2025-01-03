"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function ReelComponent({ reel, url, containerRef, isVideoMuted, setIsVideoMuted }) {
  const videoRef = useRef();
  const [file, setFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [videoIcon, setVideoIcon] = useState(faPlay);
  const [playBarWidth, setPlayBarWidth] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const t =
        (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
      const current = Math.floor(t);
      setPlayBarWidth(current);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);


  return (
    <div className="flex w-full gap-4">
      <div className="">
        <div
          className="h-[80] w-[380px] justify-center shadow-xl shadow-white/20 items-center flex relative bg-[#0c0c0c] rounded-lg mb-10 rounded-tl-none"
          style={{ aspectRatio: 9 / 16 }}
        >
          <div className="absolute h-full w-full flex justify-center">
            <video
              className="rounded-lg "
              src={url}
              loop
              muted={isVideoMuted}
              ref={videoRef}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              onLoadStart={handleLoad}
            >
              <div>logo</div>
            </video>
          </div>
          <button className="px-4 py-2 absolute" onClick={handleVideoPlay}>
            <div className="h-10 w-10 rounded-full hover:bg-black hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center">
              <FontAwesomeIcon icon={videoIcon} />
            </div>
          </button>
        </div>
        <div className="w-full z-40 pr-[0%]">
          <div
            className={`h-1 bg-white rounded-lg transition-all -translate-y-11 duration-75`}
            style={{ aspectRatio: 9 / 16, width: `${playBarWidth}%` }}
          ></div>
        </div>
      </div>
      <div
        className="w-1/12 h-[675px]  flex  flex-col justify-end pb-36 py-4 px-4 items-center "
        style={{ aspectRatio: 9 / 16 }}
      >
        <div className="flex flex-col gap-6">
          <div className="w-8 h-8 bg-white/50 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-white hover:bg-opacity-70 cursor-pointer -translate-y-64 -translate-x-20" onClick={() => setIsVideoMuted(!isVideoMuted)}>
            {isVideoMuted ? (
              <svg
                aria-label="Audio is muted"
                class="x1lliihq x1n2onr6 xq3z1fi"
                fill="currentColor"
                height="16"
                role="img"
                viewBox="0 0 48 48"
                width="16"
              >
                <title>Audio is muted</title>
                <path
                  clip-rule="evenodd"
                  d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                aria-label="Audio is playing"
                class="x1lliihq x1n2onr6 xq3z1fi"
                fill="currentColor"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Audio is playing</title>
                <path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path>
              </svg>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
          <svg
            aria-label="Like"
            class="x1lliihq x1n2onr6 x1cp0k07 cursor-pointer hover:text-[#414141]"
            fill="currentColor"
            height="30"
            role="img"
            viewBox="0 0 24 24"
            width="30"
          >
            <title>Like</title>
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
          </svg>
          <p>{reel.likes.length}</p>
          </div>
          <svg
            aria-label="Comment"
            class="x1lliihq x1n2onr6 xyb1xck cursor-pointer hover:text-[#414141]"
            fill="currentColor"
            height="30"
            role="img"
            viewBox="0 0 24 24"
            width="30"
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
          <svg
            aria-label="Share"
            class="x1lliihq x1n2onr6 xyb1xck cursor-pointer hover:text-[#414141]"
            fill="currentColor"
            height="30"
            role="img"
            viewBox="0 0 24 24"
            width="30"
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
          <svg
            aria-label="Save"
            className="cursor-pointer x1lliihq x1n2onr6 x5n08af hover:text-[#414141]"
            fill="currentColor"
            height="30"
            role="img"
            viewBox="0 0 24 24"
            width="30"
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
        </div>
      </div>
      <div className="w-[380px] h-1/4  flex flex-col    p-2 py-14 items-center  translate-y-[492px] -translate-x-[128%] " style={{ aspectRatio: 9 / 16 }} >
       <div className="w-full flex items-center gap-4  ">
        <div className="w-10 h-10 bg-white rounded-full">
          <img  src={reel?.userId?.profileImage.replace("//", "/")} className="rounded-full h-full w-full object-cover object-left-top" />
        </div>
        <p className="text-white text-sm font-semibold">{reel?.userId?.username}</p>
        </div>
      </div>
    </div>
  );
}

export default ReelComponent;
