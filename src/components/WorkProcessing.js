// import React from 'react'
// import { GiBeveledStar } from 'react-icons/gi'

// function WorkProcessing() {
//   return (
//     <div className='my-16'>
        
// <div className='flex justify-center items-center my-5'>
//     <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
//     <p className='font-serif font-semibold text-gray-700 mx-4'>Work Processing</p>
//     <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
// </div>
// <h1 className='text-center text-5xl font-bold font-serif text-gray-700'>How it Work Processing</h1>


//     </div>
//   )
// }

// export default WorkProcessing


import React from 'react';
import { GiBeveledStar } from 'react-icons/gi';
import { AiOutlineSearch, AiOutlineCreditCard, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import Marquee from "react-fast-marquee";
function WorkProcessing() {
  const steps = [
    {
      id: 1,
      title: 'Browsing & Choosing',
      description: 'This is where customers visit your online store, browse your products.',
      icon: <AiOutlineSearch className=" text-4xl" />,
    },
    {
      id: 2,
      title: 'Checkout & Payment',
      description: 'Once they have picked their items, customers proceed to checkout.',
      icon: <AiOutlineCreditCard className="text-4xl" />,
    },
    {
      id: 3,
      title: 'Order Fulfillment',
      description: 'After the order is placed, it’s sent to your fulfillment team.',
      icon: <AiOutlineCheckCircle className=" text-4xl" />,
    },
    {
      id: 4,
      title: 'Delivery to Customer',
      description: 'The packed order is then sent off with a shipping carrier.',
      icon: <FaShippingFast className=" text-4xl" />,
    },
  ];

  return (
    <div className="mb-20  p-4 ">
      {/* Title Section */}
      <div className="flex justify-center items-center my-5">
        <p>
          <GiBeveledStar className="text-pink-700 font-bold text-xl" />
        </p>
        <p className="font-serif font-semibold text-gray-700 mx-4">Work Processing</p>
        <p>
          <GiBeveledStar className="text-pink-700 font-bold text-xl" />
        </p>
      </div>
      <h1 className="text-center lg:text-5xl text-2xl font-bold font-serif text-gray-700 mb-5">
        How it Work Processing
      </h1>

      {/* Work Process Steps */}
      {/* <Marquee className='px-20'> */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-4 gap-8 ">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-lg rounded-lg p-2 text-center hover:border-2 border-gray-600 hover:scale-105 transform transition-all duration-500"
          >
            <div className="flex justify-center items-center mb-2">
              <div className="bg-yellow-300  text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow">
                {`0${step.id}`}
              </div>
            </div>
            <div className="flex text-gray-700 justify-center items-center mb-2">
              {step.icon}
            </div>
            <h2 className="font-bold text-lg text-gray-700">{step.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
      {/* </Marquee> */}
    </div>
  );
}

export default WorkProcessing;
