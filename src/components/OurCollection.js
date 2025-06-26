


import React, { useEffect, useRef } from 'react';
import { FaHeart } from "react-icons/fa";
import { gsap } from 'gsap';
import { GiBeveledStar } from 'react-icons/gi';
import Card from './Card';

function StylishCard() {
  const cardRef = useRef([]);
  const hoverContentRef = useRef([]);

  useEffect(() => {
    cardRef.current.forEach((card, index) => {
      const hoverContent = hoverContentRef.current[index];

      // Default setup for hover content
      gsap.set(hoverContent, { opacity: 0, y: 20 });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
        gsap.to(hoverContent, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
        gsap.to(hoverContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power1.out' });
      });
    });
  }, []);

 const products = [
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-1.png',
    },
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-4.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-5.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-7.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-8.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-9.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-10.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-11.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-12.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-13.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-14.png',
    },
  
  ];

  return (
    <div className="my-8 lg:px-12 px-8">
     
<div className='grid grid-cols-2 gap-5 lg:my-16' >
<div className='my-5'>
<div className='flex  items-center'>
    <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
    <p className='font-serif lg:font-semibold text-pink-700'>Feature Products</p>
</div>
<h2 className="lg:text-4xl text-xl font-bold text-gray-600 font-serif">Our Features Collection</h2>
</div>
<div className=''>

{/* <div className='my-5  grid grid-cols-3 lg:border-2 gap-2  lg:font-semibold border-orange-600 rounded-full lg:px-3 lg:py-2 '>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>New Products</button>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>Sale Products</button>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>Best Sellers</button>
</div> */}
</div>
</div>

     <div className='flex justify-center items-center lg:block'>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {products.map((product, index) => (
        <Card key={index} product={product} index={index}></Card>
        ))}
      </div>
     </div>
    </div>
  );
}

export default StylishCard;
