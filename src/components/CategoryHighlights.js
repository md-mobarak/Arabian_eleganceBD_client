
"use client";
import React, { useRef } from "react";
import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { GiBeveledStar } from "react-icons/gi";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';





function CategoryHighlights() {
  const categories = [
    {
      title: "Man Shirt",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-1.png",
      description: "High-quality men's shirts in various styles.",
    },
    {
      title: "Man Pants",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-2.png",
      description: "Stylish and durable pants for all occasions.",
    },
    {
      title: "Casual Wear",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-3.png",
      description: "Comfortable casual wear for everyday use.",
    },
    {
      title: "Formal Suit",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-4.png",
      description: "Elegant formal suits for special occasions.",
    },
    {
      title: "Sportswear",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-5.png",
      description: "Comfortable sportswear for active lifestyles.",
    },
    {
      title: "Winter Collection",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-6.png",
      description: "Stay warm with our stylish winter collection.",
    },
    {
      title: "Sportswear",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-5.png",
      description: "Comfortable sportswear for active lifestyles.",
    },
    {
      title: "Winter Collection",
      imgURL: "https://html.pixelfit.agency/pesco/assets/images/category/category-6.png",
      description: "Stay warm with our stylish winter collection.",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className=" px-4 mb-20  relative ">
      <div className='flex  items-center'>
          <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
          <p className='font-serif font-semibold text-pink-700'>Categories</p>
      </div>
      <h1 className="lg:text-4xl text-xl font-bold text-gray-600 font-serif">Browse Top Category</h1>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-[30px] right-8 lg:right-20 md:right-20 flex space-x-4 z-10">
        <button
          ref={prevRef}
          className="bg-black text-white p-2 w-12 h-12 rounded-full shadow-md hover:bg-gray-700 transition-all duration-500"
        >
          <GoArrowLeft className="text-3xl" />
        </button>
        <button
          ref={nextRef}
          className="bg-black text-white p-2 w-12 h-12 rounded-full shadow-md hover:bg-gray-700 transition-all duration-500"
        >
          <GoArrowRight className="text-3xl" />
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="mySwiper mt-6"
      >
        {categories.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="relative my-8 flex flex-col items-center space-y-4 shadow-xl">
              <Image
                src={card.imgURL}
                alt={card.title}
                width={300}
                height={300}
                className="w-full h-full rounded-3xl border-2 border-black "
              />
              <h1 className="border border-gray-500 text-black bg-white px-4 py-3 rounded-full absolute bottom-[-20px] font-sans text-md font-bold">
                {card.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoryHighlights;
