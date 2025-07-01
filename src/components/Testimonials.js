

import React, { useRef } from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { GiBeveledStar } from 'react-icons/gi';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import 'swiper/css';
import "swiper/css/navigation";
import Image from 'next/image';

function Testimonials() {
  const userReviews = [
    {
      name: "John Smith",
      rating: 4.5,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-1.png",
      description: "Excellent service! The product quality exceeded my expectations. Highly recommend.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    {
      name: "Sophia Brown",
      rating: 4.8,
      img: "https://html.pixelfit.agency/pesco/assets/images/testimonial/author-2.png",
      description: "Great customer support and fast delivery. Will definitely shop here again.",
    },
    // Add more reviews as needed...
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="flex flex-col mb-20  p-4  lg:flex-row ">
      {/* Text & Navigation Buttons Section (30%) */}
      <section className="lg:w-3/12 w-full lg:pr-8 mb-8 lg:mb-0 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center mb-4">
            <GiBeveledStar className="text-pink-700 font-bold text-xl" />
            <p className="font-serif font-semibold text-pink-700 ml-2">Categories</p>
          </div>
          <h1 className="text-xl lg:text-3xl font-semibold text-gray-600 font-serif mb-6">
            What Our Clients Say About Us
          </h1>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex space-x-4">
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
      </section>

      {/* Swiper Component (70%) */}
      <section className="lg:w-9/12 w-full">
        <Swiper
          spaceBetween={20}
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
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {userReviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="relative bg-white border-2 border-gray-600 rounded-2xl p-6 max-w-sm mx-auto shadow-lg">
                {/* Review Content */}
                <p className="text-gray-600 mb-6" title={review.description}>{review.description.slice(0,50)}</p>

                {/* Reviewer Info */}
                <div className="flex items-center">
                  {/* <img
                    src={review.img}
                    alt={review.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  /> */}
                     <Image
                        src={review.img}
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                                     
                                     
                                      width={100}
                                      height={100}
                            
                                    />
                  
                  <div className="ml-4">
                    <h4 className="text-black font-semibold">{review.name}</h4>
                    <div className="flex text-pink-600">
                      {Array(5)
                        .fill(0)
                        .map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={
                              starIndex < Math.floor(review.rating)
                                ? "text-pink-600"
                                : "text-gray-300"
                            }
                          >
                            &#9733;
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Quotation Icon */}
                <FaQuoteRight className="absolute bottom-4 right-6 text-orange-500 text-3xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Testimonials;
