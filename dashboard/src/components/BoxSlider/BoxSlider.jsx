import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./boxslider.module.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const breakpoints = {
  576: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  998: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
  1600: {
    slidesPerView: 5,
  },
};



const BoxSlider = () => {
  const swiperRef = React.useRef(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className="swipper-container">
      <Swiper
        modules={[Navigation]}
        className="py-5 mx-sm-0 mx-5 "
        breakpoints={breakpoints}
        spaceBetween={-10}
        navigation={{
          prevEl: ".swiper-prev",
          nextEl: ".swiper-next",
          disabledClass: "swiper-button-disabled",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>191</h1>
          <span>Flower</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>141</h1>
          <span>Tree</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>441</h1>
          <span>Soil</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>541</h1>
          <span>Grass</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>141</h1>
          <span>Walls</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>441</h1>
          <span>Lorem ispum</span>
        </SwiperSlide>
        <SwiperSlide className={`${styles.SliderBox}`}>
          <h1>241</h1>
          <span>Lorem ispum</span>
        </SwiperSlide>
      </Swiper>

      <button
        className={`swiper-prev ${isBeginning ? "swiper-button-disabled" : ""}`}
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>
      <button
        className={`swiper-next ${isEnd ? "swiper-button-disabled" : ""}`}
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default BoxSlider;

