"use client";

import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import Swipe from "react-easy-swipe";

interface CarouselSliderProps {
  images: string[];
}

const CarouselSlider = ({ images }: CarouselSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const DelayTime = 50000;

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  // autoplay
  useEffect(() => {
    let Delay = setTimeout(() => {
      handleNextSlide();
    }, DelayTime);
    return () => clearTimeout(Delay);
  });

  return (
    <div className="relative py-5">
      <div className="w-full h-[25vh] md:h-[67.5vh] flex overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          <div className="w-full h-full">
            {images.map((image, index) => {
              if (index === currentSlide) {
                return (
                  <Image
                    key={index}
                    src={image}
                    alt="pic"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                    className="animate-[FadeIn_2s] z-10"
                  />
                );
              }
            })}
            {images.map((image, index) => {
              if (index === currentSlide) {
                return (
                  <div
                    key={index}
                    className="hidden md:flex flex-col flex-center relative w-1/2 h-full  animate-[FadeIn_2s] z-40"
                  >
                    <h1 className="text-5xl font-semibold text-primary text-right">
                      <span className="text-secondary">Electro </span>
                      Shop
                    </h1>
                    <p className="text-xl  text-center my-10">
                      we're more than just a computer equipment store <br></br>{" "}
                      we're your technology partners
                    </p>
                    <Link href="/about" className="read-more">
                      Read More{" "}
                      <IoMdArrowRoundForward className="mt-1" size="23" />
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </Swipe>
      </div>
      {/* nav */}
      <IoIosArrowForward
        onClick={handleNextSlide}
        className="absolute right-5 m-auto text-3xl inset-y-1/2 cursor-pointer text-secondary z-20"
      />
      <IoIosArrowBack
        onClick={handlePrevSlide}
        className="absolute left-5 m-auto text-3xl inset-y-1/2 cursor-pointer text-secondary z-20"
      />
      {/* dots */}
      <div className="relative flex justify-center p-2">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-secondary rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-white rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarouselSlider;
