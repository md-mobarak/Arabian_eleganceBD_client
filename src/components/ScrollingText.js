// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import React, { useEffect, useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function ScrollingText() {
//   const textWrapperRef = useRef(null);

//   const items = ["Shirt", "Jeans", "Blazer", "Jacket", "Women", "Kids", "T-Shirt"]; // Dynamic text items

//   useEffect(() => {
//     const textWrapper = textWrapperRef.current;

//     // Horizontal scrolling animation for the text
//     gsap.fromTo(
//       textWrapper,
//       { x: "100%" }, // Start position
//       {
//         x: "-100%", // End position
//         ease: "none",
//         scrollTrigger: {
//           trigger: textWrapper, // Element to trigger animation
//           start: "top bottom", // When the top of the element hits the bottom of the viewport
//           end: "bottom top", // When the bottom of the element hits the top of the viewport
//           scrub: 1, // Sync animation with scroll
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className="text-section my-20 h-[100px] flex items-center justify-center bg-gradient-to-r from-[#c98507] via-[#FF4500] to-[#F4A460]">
//       {/* Scrolling Text Wrapper */}
  
//      <div
//         ref={textWrapperRef}
//         className="wrapper text text-4xl font-bold tracking-wide text-white uppercase flex space-x-10"
//       >
//         {items.map((item, index) => (
//           <span key={index}>{item}</span>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default ScrollingText;

import React, { useEffect, useRef } from "react";

function ScrollingText() {
  const textWrapperRef = useRef(null);

  const items = [
    "Shirt",
    "Jeans",
    "Blazer",
    "Jacket",
    "Women",
    "Kids",
    "T-Shirt",
    "Blazer",
    "Jacket",
    "Women",
    "Kids",
    "T-Shirt",
  ]; // Dynamic text items

  useEffect(() => {
    // Import GSAP dynamically to avoid server-side errors
    const initializeGsap = async () => {
      if (typeof window !== "undefined") {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const textWrapper = textWrapperRef.current;

        // Horizontal scrolling animation for the text
        gsap.fromTo(
          textWrapper,
          { x: "100%" }, // Start position
          {
            x: "-100%", // End position
            ease: "none",
            scrollTrigger: {
              trigger: textWrapper, // Element to trigger animation
              start: "top bottom", // When the top of the element hits the bottom of the viewport
              end: "bottom top", // When the bottom of the element hits the top of the viewport
              scrub: 1, // Sync animation with scroll
            },
          }
        );
      }
    };

    initializeGsap();
  }, []);

  return (
    <div className="text-section my-20 h-[100px] flex items-center justify-center bg-gradient-to-r from-[#1d0961] via-[#060539] to-[#1d0961] overflow-hidden">
      {/* Scrolling Text Wrapper */}
      <div
        ref={textWrapperRef}
        className="wrapper text text-4xl md:text-5xl font-bold tracking-wide text-white uppercase flex space-x-10 whitespace-nowrap"
      >
        {items.map((item, index) => (
          <span key={index} className="hover:scale-110 transition-transform duration-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ScrollingText;

