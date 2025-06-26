// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @next/next/no-img-element */
// // /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// import { gsap } from "gsap";

// function HeroSection() {
//   const images = [
//     "https://html.pixelfit.agency/pesco/assets/images/hero/hero-one_img1.jpg",
//     "https://html.pixelfit.agency/pesco/assets/images/hero/hero-two_img1.jpg",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     const slides = document.querySelectorAll(".carousel-slide");
//     slides.forEach((slide, index) => {
//       gsap.set(slide, { x: index === currentIndex ? 0 : "100%" });
//     });

//     function slideTo(nextIndex) {
//       if (isAnimating || !slides.length) return;
//       setIsAnimating(true);

//       const currentSlide = slides[currentIndex];
//       const nextSlide = slides[nextIndex];

//       gsap.timeline({
//         onComplete: () => setIsAnimating(false),
//       })
//         .to(currentSlide, { x: "-100%", duration: 1, ease: "power3.out" })
//         .fromTo(nextSlide, { x: "100%" }, { x: 0, duration: 1, ease: "power3.out" });

//       setCurrentIndex(nextIndex);
//     }

//     const handlePrevClick = () => slideTo((currentIndex - 1 + images.length) % images.length);
//     const handleNextClick = () => slideTo((currentIndex + 1) % images.length);

//     const intervalId = setInterval(handleNextClick, 3000);
//     return () => clearInterval(intervalId);
//   }, [currentIndex, images.length, isAnimating]);

//   return (
//     <div>
//       <section className="bg-gray-100 h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10">
//         <div className="hero-text max-w-lg space-y-6 text-center lg:text-left">
//           <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
//             Discover Your <span className="text-orange-500">Elegance</span>
//           </h1>
//           <p className="text-gray-600 text-lg leading-relaxed">
//             Explore the finest collection of Arabian Burqas, Hijabs, T-shirts, and more with amazing deals. Shop now to redefine your style!
//           </p>
//           <div className="cta-buttons flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//             <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
//               Shop Now
//             </button>
//             <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900">
//               Explore More
//             </button>
//           </div>
//         </div>

//         <div className="hero-carousel w-full lg:w-1/2 h-full mt-10 lg:mt-0 relative overflow-hidden">
//           <button className="prev-button absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10">
//             <FaArrowAltCircleLeft />
//           </button>
//           <button className="next-button absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10">
//             <FaArrowAltCircleRight />
//           </button>

//           <div className="carousel-images relative w-full h-full">
//             {images.map((image, index) => (
//               <div key={index} className={`carousel-slide absolute top-0 left-0 w-full h-full flex justify-center items-center`}>
//                 <Image src={image} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default HeroSection;


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// import { gsap } from "gsap";

// function HeroSection() {
//   const images = [
//     "https://html.pixelfit.agency/pesco/assets/images/hero/hero-one_img1.jpg",
//     "https://html.pixelfit.agency/pesco/assets/images/hero/hero-two_img1.jpg",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const slidesRef = useRef([]);

//   useEffect(() => {
//     slidesRef.current.forEach((slide, index) => {
//       gsap.set(slide, { x: index === currentIndex ? 0 : "100%" });
//     });
//   }, []);

//   const slideTo = (nextIndex) => {
//     if (isAnimating || !slidesRef.current.length) return;
//     setIsAnimating(true);

//     const currentSlide = slidesRef.current[currentIndex];
//     const nextSlide = slidesRef.current[nextIndex];

//     gsap
//       .timeline({
//         onComplete: () => setIsAnimating(false),
//       })
//       .to(currentSlide, { x: "-100%", duration: 1, ease: "power3.out" })
//       .fromTo(nextSlide, { x: "100%" }, { x: 0, duration: 1, ease: "power3.out" });

//     setCurrentIndex(nextIndex);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       slideTo((currentIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, [currentIndex]);

//   return (
//     <section className="relative h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10">
//       {/* Text Section */}
//       <div className="hero-text max-w-lg space-y-6 text-center lg:text-left">
//         <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
//           Discover Your <span className="text-orange-500">Elegance</span>
//         </h1>
//         <p className="text-gray-600 text-lg leading-relaxed">
//           Explore the finest collection of Arabian Burqas, Hijabs, T-shirts, and more with amazing deals. Shop now to redefine your style!
//         </p>
//         <div className="cta-buttons flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//           <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
//             Shop Now
//           </button>
//           <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900">
//             Explore More
//           </button>
//         </div>
//       </div>

//       {/* Hero Carousel */}
//       <div className="hero-carousel w-full lg:w-1/2 h-full mt-10 lg:mt-0 relative overflow-hidden">
//         <button
//           className="prev-button absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10"
//           onClick={() => slideTo((currentIndex - 1 + images.length) % images.length)}
//         >
//           <FaArrowAltCircleLeft />
//         </button>
//         <button
//           className="next-button absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10"
//           onClick={() => slideTo((currentIndex + 1) % images.length)}
//         >
//           <FaArrowAltCircleRight />
//         </button>

//         <div className="carousel-images relative w-full h-full">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               ref={(el) => (slidesRef.current[index] = el)}
//               className={`carousel-slide absolute top-0 left-0 w-full h-full flex justify-center items-center`}
//             >
//               <Image src={image} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { gsap } from "gsap";

function HeroSection() {
  const images = [
    "https://html.pixelfit.agency/pesco/assets/images/hero/hero-one_img1.jpg",
    "https://html.pixelfit.agency/pesco/assets/images/hero/hero-two_img1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const slidesRef = useRef([]);
  const intervalRef = useRef(null);

  // GSAP animation setup
  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      gsap.set(slide, { x: index === currentIndex ? 0 : "100%" });
    });
  }, [currentIndex]);

  // Slide animation function
  const slideTo = useCallback(
    (nextIndex) => {
      if (isAnimating.current || !slidesRef.current.length) return;
      isAnimating.current = true;

      const currentSlide = slidesRef.current[currentIndex];
      const nextSlide = slidesRef.current[nextIndex];

      gsap
        .timeline({
          onComplete: () => {
            isAnimating.current = false;
            setCurrentIndex(nextIndex);
          },
        })
        .to(currentSlide, { x: "-100%", duration: 1, ease: "power3.out" })
        .fromTo(
          nextSlide,
          { x: "100%" },
          { x: 0, duration: 1, ease: "power3.out" },
          0
        );
    },
    [currentIndex]
  );

  // Auto-slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        slideTo((currentIndex + 1) % images.length);
      }, 3000);
    };

    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, images.length, slideTo]);

  // Cleanup GSAP animations
  useEffect(() => {
    return () => {
      gsap.killTweensOf(slidesRef.current);
    };
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Text Section */}
      <div className="hero-text w-full lg:w-1/2 max-w-xl space-y-4 sm:space-y-6 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Discover Your <span className="text-orange-500">Elegance</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Explore the finest collection of Arabian Burqas, Hijabs, T-shirts, and more with amazing deals.
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <button className="bg-orange-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
            Shop Now
          </button>
          <button className="bg-gray-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-sm sm:text-base">
            Explore More
          </button>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="hero-carousel w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-full relative overflow-hidden">
        <button
          className="prev-button absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800/80 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-gray-900 transition-colors"
          onClick={() => slideTo((currentIndex - 1 + images.length) % images.length)}
          aria-label="Previous slide"
        >
          <FaArrowAltCircleLeft className="text-xl sm:text-2xl" />
        </button>
        <button
          className="next-button absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800/80 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-gray-900 transition-colors"
          onClick={() => slideTo((currentIndex + 1) % images.length)}
          aria-label="Next slide"
        >
          <FaArrowAltCircleRight className="text-xl sm:text-2xl" />
        </button>

        <div className="carousel-images relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (slidesRef.current[index] = el)}
              className="carousel-slide absolute top-0 left-0 w-full h-full"
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;