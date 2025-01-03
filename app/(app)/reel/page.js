"use client";
import ReelComponent from "@/app/components/ReelComponent";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";

function Page() {
  const reelRefs = useRef([]);
  const [reels, setReels] = useState([]);
  const scrollContainer = useRef(null);
  const [currentReel, setCurrentReel] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const handleScroll = (e) => {
    const scrollPosition = Math.floor(e.target.scrollTop);
    const children = Array.from(scrollContainer.current.children);
    children.forEach((child, index) => {
      const video = child.querySelector("video");
      const videoHeight = video.offsetHeight;
      const videoOffsetTop = child.offsetTop;
      const videoOffsetBottom = videoOffsetTop + videoHeight;
      const viewportHeight = e.target.offsetHeight;
      const viewportOffsetTop = scrollPosition;
      const viewportOffsetBottom = viewportOffsetTop + viewportHeight;
      const isVideoVisible =
        viewportOffsetTop < videoOffsetBottom &&
        viewportOffsetBottom > videoOffsetTop;
      const isVideoHalfVisible =
        viewportOffsetTop + viewportHeight / 1.25 < videoOffsetBottom &&
        viewportOffsetBottom > videoOffsetTop + videoHeight / 1.25;
      if (isVideoHalfVisible) {
        if (document.hasFocus()) {
          video.play();
        }
      } else {
        video.pause();
      }
    });
  };

  const fetchReels = async () => {
    try {
      const response = await axios.get("/api/Reels/Get-All-Reels");
      setReels(response.data.reels);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div
      className="h-full w-full  pt-4 text-white flex flex-col overflow-y-auto gap-2 pl-[20%] hide-scrollbar scroll-smooth"
      ref={scrollContainer}
      onScroll={handleScroll}
    >
      {reels.map((reel, index) => (
        <ReelComponent
          key={reel.id}
          reel={reel}
          url={reel.videoUrl}
          ref={reelRefs[index]}
          isVideoMuted={isVideoMuted}
          setIsVideoMuted={setIsVideoMuted}
        />
      ))}
    </div>
  );
}

export default Page;
