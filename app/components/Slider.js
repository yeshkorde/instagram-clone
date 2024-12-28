"use client";
import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function Slider({ images }) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0
  });

  const handleload = (e) => {
    const img = e.target;
    const { naturalWidth, naturalHeight } = img;
    
    // Calculate aspect ratio
    const aspectRatio = naturalWidth / naturalHeight;
    
    let newWidth, newHeight;
    
    if (naturalHeight > 700) {
      newHeight = 700;
      newWidth = newHeight * aspectRatio;
    } else {
      newHeight = naturalHeight;
      newWidth = naturalWidth;
    }

    // Maximum width constraint
    if (newWidth > 1000) {
      newWidth = 1000;
      newHeight = newWidth / aspectRatio;
    }

    setImageDimensions({
      width: newWidth,
      height: newHeight
    });

    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
    img.style.objectFit = "contain";
  };

  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        style={{
          width: imageDimensions.width ? `${imageDimensions.width}px` : '100%',
          height: imageDimensions.height ? `${imageDimensions.height}px` : '100%'
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-black"
          >
            <div className="overflow-hidden flex items-center justify-center">
              <img
                onLoad={handleload}
                src={image}
                alt="post"
                className="rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
