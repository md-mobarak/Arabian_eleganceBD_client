/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function UpToProduct() {
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="bg-gray-50 mb-20  p-4 flex justify-center items-center">
      <div className="lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-4 relative border border-black"
            data-aos="fade-up-bottom" 
            data-aos-duration="1000"
          >
            <div className="text-center md:text-left">
              <p className="text-gray-500 uppercase text-xl md:text-3xl">Up To</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">50%</h2>
              <p className="text-gray-600 mt-2 text-lg md:text-3xl">
                Exclusive Kids & Adults Summer Outfits
              </p>
              <button className="mt-4 px-6 md:px-8 py-2 md:py-3 bg-gray-800 text-white rounded-full hover:bg-pink-700">
                Shop Now
              </button>
            </div>
            <img
              src="https://html.pixelfit.agency/pesco/assets/images/banner/banner-1.png"
              alt="Up to 50% OFF"
              className="object-cover w-48 md:w-64"
            />
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-4 relative border border-black"
            data-aos="fade-up-bottom" 
            data-aos-duration="1000"
          >
            <div className="text-center md:text-left">
              <p className="text-gray-500 uppercase text-xl md:text-3xl">Up To</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">70%</h2>
              <p className="text-gray-600 mt-2 text-lg md:text-3xl">
                Exclusive Kids & Adults Summer Outfits
              </p>
              <button className="mt-4 px-6 md:px-8 py-2 md:py-3 bg-gray-800 text-white rounded-full hover:bg-pink-700">
                Shop Now
              </button>
            </div>
            <img
              src="https://html.pixelfit.agency/pesco/assets/images/banner/banner-2.png"
              alt="Up to 70% OFF"
              className="object-cover w-48 md:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpToProduct;
