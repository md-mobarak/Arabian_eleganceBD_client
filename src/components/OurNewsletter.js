// components/OurNewsletter.js
import Image from 'next/image';
import React from 'react';

function OurNewsletter() {
  return (
    <div className="relative lg:my-20 bg-[#fff7f2] py-10 px-16 flex flex-col justify-around md:flex-row  items-center overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 bg-[url('/path-to-background-logo.png')] bg-no-repeat bg-left-top opacity-10 pointer-events-none"></div>

    <div>
          {/* Text Section */}
      <div className="md:w-2/3 z-10 text-center md:text-left">
        <h3 className="text-lg font-semibold text-gray-800">Our Newsletter</h3>
        <p className="mt-2 lg:text-4xl text-2xl font-bold text-gray-900">
          Get Weekly Update. Sign Up And Get Up To <span className="text-red-500">20% Off</span> Your <br></br> First Purchase
        </p>
      </div>

      {/* Input and Button */}
      <div className="flex flex-col mt-4 md:flex-row md:items-center md:gap-2 z-10 w-full md:w-auto">
        <input
          type="email"
          placeholder="Write your Email Address"
          className="flex-grow md:flex-none px-4 py-2 text-gray-700 bg-white border-2 border-black rounded-full focus:outline-none focus:ring focus:ring-gray-300"
        />
        <button
          className="mt-2 md:mt-0 bg-black text-white px-6 py-3 rounded-full font-semibold  hover:bg-pink-600 transition duration-300 "
        >
          Subscribe
        </button>
      </div>
    </div>

      {/* Right Image */}
      <div className="w-full md:w-1/3 z-10 mt-4 md:mt-0">
      <Image
            src="https://html.pixelfit.agency/pesco/assets/images/newsletter/newsletter-1.png"
            alt="Stylish Couple"
            className="w-full h-auto object-contain"
            width={600}
            height={400}
            layout="responsive"
      />
        {/* <img
          src="https://html.pixelfit.agency/pesco/assets/images/newsletter/newsletter-1.png"
          alt="Stylish Couple"
          className="w-full h-auto object-contain"
        /> */}
      </div>
    </div>
  );
}

export default OurNewsletter;
