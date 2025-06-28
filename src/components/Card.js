// import React from 'react'
// // components/ProductCard.js
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// function Card({product,index}) {
//   const router = useRouter();
//   const [inCart, setInCart] = useState(false);


//   // Check cart status
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     setInCart(cart.some(item => item._id === product._id));
//   }, [product._id]);

//   // Update inCart state when local storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       setInCart(cart.some(item => item._id === product._id));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [product._id]);

//   // Cart handling
//   const handleCartAction = () => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItem = cart.find(item => item._id === product._id);

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     toast.success('product add to cart')
//     setInCart(true);
//     window.dispatchEvent(new Event('storage')); // Notify other components of the change
//   };




//   return (
//     <div className="max-w-sm rounded-xl w-74 lg:w-full h-full shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
//     <div className="relative h-42">
//       <Image
//         src={product?.img}
//         alt={product?.title}
//         layout="fill"
//         objectFit={'cover lg:none'}
//         className="rounded-t-xl p-2"
//         placeholder="blur"
//         blurDataURL="/placeholder-image.jpg"
//       />
//       <span className="absolute top-2 right-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
//         {product?.discount}
//       </span>
//     </div>

//     <div className="p-2">
//       <h3 className="text-lg font-semibold truncate">{product?.title}</h3>
      
//       <div className="mt-1 flex items-center gap-2">
//         <span className="text-2xl font-bold text-gray-800">
//           ${product?.price}
//         </span>
//         <span className="text-gray-500 line-through">
//           ${product?.oldPrice}
//         </span>
//       </div>

//       <div className={`mt-1 text-sm ${
//         product?.stock > 0 ? 'text-green-600' : 'text-red-600'
//       }`}>
//         {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
//       </div>

//       {/* <div className="mt-2 grid grid-cols-2 gap-2">
//         <button
//           // onClick={()=>handleAddToCart()}
//           onClick={ handleCartAction}
//           disabled={product?.stock < 1 ||inCart}
//           className={`p-2  rounded-lg text-sm font-medium ${
//             product.stock < 1 
//               ? 'bg-gray-300 '
//               : 'bg-black hover:bg-black text-white'
//           }`}
//         >
//           {inCart ? 'Added to Cart' : 'Add to Cart'}
//         </button>
       

//         <button
//           onClick={() => router.push(`/shop/${product._id}`)}
//           disabled={product?.stock === 0}
//           className={`p-2 rounded-lg text-sm font-medium ${
//             product?.stock === 0
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-orange-600 hover:bg-orange-700 text-white'
//           }`}
//         >
//           Buy Now
//         </button>
//       </div> */}
//         <div className="mt-2 grid grid-cols-2 gap-2">
//         {/* <button
//           // onClick={()=>handleAddToCart()}
//           onClick={ handleCartAction}
//           disabled={product?.stock < 1 ||inCart}
//           className={`p-2  rounded-lg text-sm font-medium ${
//             product.stock < 1 
//               ? 'bg-gray-300 '
//               : 'bg-black hover:bg-black text-white'
//           }`}
//         >
//           {inCart ? 'Added to Cart' : 'Add to Cart'}
//         </button> */}
//        <button 
//           onClick={ handleCartAction}
//           disabled={product?.stock < 1 ||inCart}
//           className={`btn btn-xs rounded-none${
//             product.stock < 1 
//               ? 'bg-gray-300 '
//               : ' bg-orange-600 text-white border-0'
//           }`}
       
// >Add to cart</button>

//         {/* <button
//           onClick={() => router.push(`/shop/${product._id}`)}
//           disabled={product?.stock === 0}
//           className={`p-2 rounded-lg text-sm font-medium ${
//             product?.stock === 0
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-orange-600 hover:bg-orange-700 text-white'
//           }`}
//         >
//           Buy Now
//         </button> */}
//         <button
//             onClick={() => router.push(`/shop/${product._id}`)}
//             disabled={product?.stock === 0}
//             className={`btn btn-xs bg-black text-white border-0 rounded-none ${
//               product?.stock === 0
//                 ? 'bg-gray-300  cursor-not-allowed'
//                 : 'bg-black text-white border-0'
//             }`}
//        >Buy Now</button>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Card

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import gsap from 'gsap';

function Card({ product, index,id }) {
  const router = useRouter();
  const [inCart, setInCart] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const buttons = buttonsRef.current;

    // Initial setup
    gsap.set(buttons, { opacity: 0, y: 10 });

    // Hover animation timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(card, { 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.3 
      })
      .to(image, { scale: 1.05, duration: 0.4 }, 0)
      .to(buttons, { opacity: 1, y: 0, duration: 0.3 }, 0.1);

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());

    return () => {
      card.removeEventListener('mouseenter', () => tl.play());
      card.removeEventListener('mouseleave', () => tl.reverse());
    };
  }, []);

  // Check cart status
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setInCart(cart.some(item => item._id === product._id));
  }, [product._id]);

  // Cart handling function
  const handleCartAction = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart?.find(item => item?._id === product?._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart');
    setInCart(true);
    window.dispatchEvent(new Event('storage'));
  };

  return (
      <button
      className=' cursor-pointer'
              onClick={() => router.push(`/shop/${product._id}`)}>
    <div 
      ref={cardRef}
      className="relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <div ref={imageRef} className="h-full w-full">
          <Image
            src={product?.img}
            alt={product?.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500"
            placeholder="blur"
            blurDataURL="/placeholder-image.jpg"
          />
        </div>
        
        {/* Discount Badge */}
        {product?.discount && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
        
        {/* Stock Status */}
        <div className={`absolute bottom-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${
          product?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 h-12">
          {product?.title}
        </h3>
        
        {/* Rating */}
        {product?.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-orange-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-500 text-xs ml-1">({product.rating})</span>
          </div>
        )}
        
        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-800">
              ${product?.price}
            </span>
            {product?.oldPrice && (
              <span className="text-gray-500 text-sm line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
          
          {/* Buttons - Animated on hover */}
          <div 
            ref={buttonsRef}
            className="grid grid-cols-2 gap-2 mt-3"
          >
            <button
              onClick={handleCartAction}
              disabled={product?.stock < 1 || inCart}
              className={`py-2 text-xs rounded-lg font-medium transition-colors ${
                product?.stock < 1 || inCart
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-black text-white'
              }`}
            >
              {inCart ? 'Added' : 'Add to Cart'}
            </button>
            
            <button
              onClick={() => router.push(`/shop/${product._id}`)}
              disabled={product?.stock === 0}
              className={`py-2 text-xs rounded-lg font-medium transition-colors ${
                product?.stock === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </button>
  );
}

export default Card;