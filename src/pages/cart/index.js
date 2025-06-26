
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
const router = useRouter()
  useEffect(() => {
    const items = localStorage.getItem('cart');
    if (items) setCartItems(JSON.parse(items));
  }, []);
  // console.log(cartItems)

  const handleQuantityChange = (index, newQuantity) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, newQuantity);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };
   // Update inCart state when local storage changes
    // useEffect(() => {
    //   const handleStorageChange = () => {
    //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     setInCart(cart.some(item => item._id === product._id));
    //   };
  
    //   window.addEventListener('storage', handleStorageChange);
    //   return () => {
    //     window.removeEventListener('storage', handleStorageChange);
    //   };
    // }, [product._id]);

  const total = cartItems.reduce((acc, item) => acc + (item?.price * item?.quantity), 0);
  const shipping = 120;
  const grandTotal = total + shipping;

  return (
   <>
   <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-600">Your cart is feeling lonely!</p>
            <button onClick={()=>router.push('/shop')} className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-4 border-b border-orange-100">
                <div className="col-span-6 font-semibold text-orange-800">Product</div>
                <div className="col-span-2 font-semibold text-orange-800">Price</div>
                <div className="col-span-2 font-semibold text-orange-800">Quantity</div>
                <div className="col-span-2 font-semibold text-orange-800">Total</div>
              </div>

              {cartItems?.map((item, index) => (
                
                <div key={index} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-orange-100 last:border-0 group">
                  <div className="col-span-6 flex items-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mr-4">
                      <Image
                        src={item?.images[0]}
                        alt={item?.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100px, 150px"
                      />
                      <button 
                        onClick={() => removeItem(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                      >
                        ✕
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item?.name}</h3>
                      <p className="text-sm text-gray-500">{item?.category?.name}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-orange-700">৳{item?.price}</div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-orange-200 rounded-lg text-center focus:ring-2 focus:ring-orange-200"
                      min="1"
                    />
                  </div>
                  
                  <div className="col-span-2 font-medium text-orange-700">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-100 h-fit">
              <h2 className="text-2xl font-bold text-orange-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-orange-700">৳{total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-orange-700">৳120</span>
                </div>
                
                <div className="pt-4 border-t border-orange-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-orange-800">Total</span>
                    <span className="text-orange-800">৳{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button   onClick={() => router.push(`/checkout`)} className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition transform hover:scale-[1.01]">
                  Proceed to Checkout
                </button>
                
                <button onClick={() => router.push(`/shop`)} className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-xl hover:bg-orange-50 transition">
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 p-4 bg-orange-100 rounded-lg">
                <p className="text-sm text-orange-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
      <Footer></Footer>
   </>
  );
}