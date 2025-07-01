
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";

function StayingProduct() {
  const shippingCard = [
    {
      logoImg: <FaShippingFast />,
      title: "Free Shipping",
      description: "Enjoy free shipping on orders over $50. Delivery within 5-7 business days.",
    },
    {
      logoImg: <FaMicrophone />,
      title: "Great Support 24/7",
      description: "Get your items delivered in 2-3 business days with our express service.",
    },
    {
      logoImg: <FaHandshakeSimple />,
      title: "Return Available",
      description: "We deliver worldwide! Shipping times may vary by location.",
    },
    {
      logoImg: <AiFillSafetyCertificate  ></AiFillSafetyCertificate>,
      title: "Secure Payment",
      description: "Order by 12 PM and get your package on the same day. Available in select locations.",
    },
  ];

  return (
 <div className="px-4 mb-20  flex justify-center items-center">
     <div className="bg-white rounded-xl border border-dotted border-gray-400 lg:flex justify-evenly items-center">
      {shippingCard.map((card, index) => (
        <div key={index} className=" flex justify-between space-x-3 items-center py-8 px-5">
          {
          // card.logoImg
          <h1 className="text-3xl p-3 text-gray-700  border border-gray-400 rounded-full">{card.logoImg}</h1>
          
          }
          <div>
          <h1 className="text-orange-400 font-sans text-xl font-bold">{card.title}</h1>
          <p className="text-gray-700 font-serif ">{card.description.slice(0,40)}</p>
          </div>
        </div>
      ))}
    </div>
 </div>
  );
}

export default StayingProduct;
