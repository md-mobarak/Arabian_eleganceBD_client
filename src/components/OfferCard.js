// /* eslint-disable @next/next/no-img-element */
// import React from 'react'
// import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
// import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// function OfferCard() {
//   return (
// <div className='px-12 lg:my-20 my-10'>
// <div className='grid  flex-col-reverse lg:grid-cols-2 border-2 rounded-3xl border-gray-600 pt-6 pr-4'>

// <section className='flex justify-center items-center'>
//     <div>
//         <div className='my-6'>
//             <h1 className='text-center text-4xl font-serif font-bold'>Hurry Up! Offer ends in. <br/> <span className='text-pink-600'>Get
//             UP TO 80% OFF</span></h1>
//         </div>
//     <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />
//     <div className='flex justify-center'>
//     <button className="mt-4 px-6 md:px-8 py-2 md:py-3 bg-black text-white rounded-full hover:bg-pink-600">
//                 Shop Now
//      </button>
//     </div>
//     </div>
     
//     </section>
//     <section>
// <img src="https://html.pixelfit.agency/pesco/assets/images/banner/deal-1.png" alt=""/>
//     </section>
//    </div>
// </div>
//   )
// }

// export default OfferCard

// /* eslint-disable @next/next/no-img-element */
// import React, { useState, useEffect } from 'react';
// import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
// import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// function OfferCard() {
//   const [isClient, setIsClient] = useState(false);
//   const offerEndsIn = new Date().getTime() + 24 * 3600 * 1000 + 5000; // Set offer countdown

//   useEffect(() => {
//     // Set isClient to true after hydration
//     setIsClient(true);
//   }, []);

//   return (
//     <div className="px-6 lg:px-12 my-10 lg:my-20">
//       <div className="grid lg:grid-cols-2 border-2 border-gray-600 rounded-3xl overflow-hidden">
//         {/* Offer Text Section */}
//         <section className="flex flex-col justify-center items-center bg-gray-50 p-6">
//            <h3 className='text-center font-semibold text-xl my-3'>Deal of the Week</h3>
//           <h1 className="text-center text-2xl lg:text-4xl font-serif font-bold mb-6">
//             Hurry Up! Offer ends in. <br />
//             <span className="text-pink-600">Get UP TO 80% OFF</span>
//           </h1>

//           {/* Only render FlipClockCountdown on the client */}
//           {isClient && (
//             <FlipClockCountdown to={offerEndsIn} className="mb-6" />
//           )}

//           <button className="px-6 md:px-8 py-2 md:py-3 bg-black text-white rounded-full hover:bg-pink-600 transition duration-300">
//             Shop Now
//           </button>
//         </section>

//         {/* Image Section */}
//         <section className="bg-white">
//           <img
//             src="https://html.pixelfit.agency/pesco/assets/images/banner/deal-1.png"
//             alt="Offer Banner"
//             className="w-full h-full object-cover"
//           />
//         </section>
//       </div>
//     </div>
//   );
// }

// export default OfferCard;


/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function OfferCard() {
  const [isClient, setIsClient] = useState(false);
  const offerEndsIn = new Date().getTime() + 24 * 3600 * 1000 + 5000; // 24-hour countdown

  useEffect(() => {
    // Ensure rendering only after hydration
    setIsClient(true);
  }, []);

  return (
    <div className=" mb-20  p-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100 border border-gray-300 rounded-3xl shadow-lg overflow-hidden">
        {/* Offer Text Section */}
        <section className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-50 p-8 lg:p-12  text-center lg:text-left">
          <h3 className="text-lg lg:text-xl font-medium text-gray-700 mb-3">
            Deal of the Week
          </h3>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900 leading-snug">
            Hurry Up! Offer ends in <br />
            <span className="text-pink-600">Get UP TO 80% OFF</span>
          </h1>

          {/* FlipClockCountdown */}
         <div className=''>
         {isClient && (
            <div className="mt-6 w-full flex justify-center lg:justify-start">
              <FlipClockCountdown
                to={offerEndsIn}
                className="text-gray-900 "
                labels={['Days', 'Hours', 'Minutes', 'Seconds']}
                duration={0.6}
              />
            </div>
          )}
         </div>

          <button className="mt-8 px-6 lg:px-10 py-3 bg-black text-white rounded-full text-sm lg:text-base hover:bg-pink-600 transition duration-300">
            Shop Now
          </button>
        </section>

        {/* Image Section */}
        <section className="bg-white">
          <img
            src="https://html.pixelfit.agency/pesco/assets/images/banner/deal-1.png"
            alt="Offer Banner"
            className="w-full h-full object-cover"
          />
        </section>
      </div>
    </div>
  );
}

export default OfferCard;
