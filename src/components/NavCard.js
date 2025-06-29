// components/NavCard.jsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const NavCard = ({ product }) => {
      const router = useRouter();
      const [inCart, setInCart] = useState(false);
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
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform hover:scale-[1.02]">
      <div className="relative h-40">
        <Image
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 line-clamp-2 h-12 mb-1">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">(4.5)</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link 
              href={`/shop/${product._id}`}
              className="text-center py-2 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Details
            </Link>
            {/* <button     onClick={handleCartAction} className="py-2 text-xs bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Add to Cart
            </button> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCard;