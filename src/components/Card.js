import React from 'react'
// components/ProductCard.js
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
function Card({product,index}) {
  const router = useRouter();
  const [inCart, setInCart] = useState(false);


  // Check cart status
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setInCart(cart.some(item => item._id === product._id));
  }, [product._id]);

  // Update inCart state when local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setInCart(cart.some(item => item._id === product._id));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [product._id]);

  // Cart handling
  const handleCartAction = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('product add to cart')
    setInCart(true);
    window.dispatchEvent(new Event('storage')); // Notify other components of the change
  };




  return (
    <div className="max-w-sm rounded-xl w-74 lg:w-full h-full shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
    <div className="relative h-42">
      <Image
        src={product?.img}
        alt={product?.title}
        layout="fill"
        objectFit={'cover lg:none'}
        className="rounded-t-xl p-2"
        placeholder="blur"
        blurDataURL="/placeholder-image.jpg"
      />
      <span className="absolute top-2 right-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
        {product?.discount}
      </span>
    </div>

    <div className="p-2">
      <h3 className="text-lg font-semibold truncate">{product?.title}</h3>
      
      <div className="mt-1 flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-800">
          ${product?.price}
        </span>
        <span className="text-gray-500 line-through">
          ${product?.oldPrice}
        </span>
      </div>

      <div className={`mt-1 text-sm ${
        product?.stock > 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
      </div>

      {/* <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          // onClick={()=>handleAddToCart()}
          onClick={ handleCartAction}
          disabled={product?.stock < 1 ||inCart}
          className={`p-2  rounded-lg text-sm font-medium ${
            product.stock < 1 
              ? 'bg-gray-300 '
              : 'bg-black hover:bg-black text-white'
          }`}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
       

        <button
          onClick={() => router.push(`/shop/${product._id}`)}
          disabled={product?.stock === 0}
          className={`p-2 rounded-lg text-sm font-medium ${
            product?.stock === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          Buy Now
        </button>
      </div> */}
        <div className="mt-2 grid grid-cols-2 gap-2">
        {/* <button
          // onClick={()=>handleAddToCart()}
          onClick={ handleCartAction}
          disabled={product?.stock < 1 ||inCart}
          className={`p-2  rounded-lg text-sm font-medium ${
            product.stock < 1 
              ? 'bg-gray-300 '
              : 'bg-black hover:bg-black text-white'
          }`}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button> */}
       <button 
          onClick={ handleCartAction}
          disabled={product?.stock < 1 ||inCart}
          className={`btn btn-xs rounded-none${
            product.stock < 1 
              ? 'bg-gray-300 '
              : ' bg-orange-600 text-white border-0'
          }`}
       
>Add to cart</button>

        {/* <button
          onClick={() => router.push(`/shop/${product._id}`)}
          disabled={product?.stock === 0}
          className={`p-2 rounded-lg text-sm font-medium ${
            product?.stock === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          Buy Now
        </button> */}
        <button
            onClick={() => router.push(`/shop/${product._id}`)}
            disabled={product?.stock === 0}
            className={`btn btn-xs bg-black text-white border-0 rounded-none ${
              product?.stock === 0
                ? 'bg-gray-300  cursor-not-allowed'
                : 'bg-black text-white border-0'
            }`}
       >Buy Now</button>
      </div>
    </div>
  </div>
  )
}

export default Card
