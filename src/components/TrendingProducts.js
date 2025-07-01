/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { GiBeveledStar } from "react-icons/gi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
// import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
// Import Swiper styles

import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";


function TrendingProducts() {
  const trendingProducts = [
    {
      id: 1,
      name: "Stylish Jacket",
      price: "$49.99",
      oldPrice: "$69.99",
      discount: "30% OFF",
      rating: 4.7,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-1.png",
    },
    {
      id: 2,
      name: "Modern T-Shirt",
      price: "$29.99",
      oldPrice: "$39.99",
      discount: "25% OFF",
      rating: 4.5,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-2.png",
    },
    {
      id: 3,
      name: "Casual Shoes",
      price: "$59.99",
      oldPrice: "$79.99",
      discount: "20% OFF",
      rating: 4.6,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-3.png",
    },
    {
      id: 4,
      name: "Classic Watch",
      price: "$99.99",
      oldPrice: "$129.99",
      discount: "35% OFF",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-4.png",
    },
    {
      id: 5,
      name: "Leather Bag",
      price: "$89.99",
      oldPrice: "$119.99",
      discount: "25% OFF",
      rating: 4.9,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-5.png",
    },
    {
      id: 5,
      name: "Leather Bag",
      price: "$89.99",
      oldPrice: "$119.99",
      discount: "25% OFF",
      rating: 4.9,
      img: "https://html.pixelfit.agency/pesco/assets/images/products/trending-product-6.png",
    },
   
  ];
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="mb-20  p-4 ">
      {/* 1st section */}
      <div className="relative">
         {/* <p className="text-xl font-semibold text-pink-600"> <GiBeveledStar className="text-lg text-geen-500 px-2" /> Categories</p> */}
              <div className='flex  items-center'>
                  <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
                  <p className='font-serif font-semibold text-pink-700'>Categories</p>
              </div>
              <h1 className="lg:text-4xl text-xl font-bold text-gray-600 font-serif">Whats Trending Now</h1>
        
              {/* Custom Navigation Buttons */}
              <div className="absolute top-[30px] lg:right-20 right-[-20px] flex space-x-4 z-10">
                <button
                  ref={prevRef}
                  className="bg-black text-white p-2 w-12 h-12 rounded-full shadow-md 
                             hover:bg-gray-700 transition-all duration-500"
                >
                  <GoArrowLeft className="text-3xl" />
                </button>
                <button
                  ref={nextRef}
                  className="bg-black text-white p-2 w-12 h-12 rounded-full shadow-md 
                             hover:bg-gray-700 transition-all duration-500"
                >
                  <GoArrowRight className="text-3xl" />
                </button>
              </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-6 p-6 "> */}

{/* Swiper Slider */}
<Swiper
        spaceBetween={30}
        loop={true} // Enable infinite loop
        autoplay={{
          delay: 3000, // 2 seconds
          disableOnInteraction: false, // Keep autoplay running even after interaction
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          // Attach custom navigation elements
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper my-10"
      >


        {trendingProducts.map((product, index) => (
             <SwiperSlide key={index}>
          <div key={product.id} className="p-3 bg-white rounded-3xl cursor-pointer">
            <section>
              <img
                className=" z-50 rounded-[40px] p-4 w-full h-full"
                src={product.img}
                alt={product.name}
              />
            </section>
            <section className="flex mt-[-230px] p-5 justify-between rounded-3xl items-end border border-dashed border-gray-400 h-80">
              <div>
                <p className="flex text-xl">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <IoMdStar
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-pink-600"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  <span className="text-gray-700 text-sm">(80)</span>
                </p>
                <p className="text-gray-600 text-2xl font-semibold">
                  {product.name}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {product.price}
                </p>
                <p className="text-xl font-semibold text-gray-600">
                  <s>{product.oldPrice}</s>
                </p>
              </div>
            </section>
          </div>
          </SwiperSlide>
        ))}
         </Swiper>
      {/* </div> */}
    </div>
  );
}

export default TrendingProducts;


