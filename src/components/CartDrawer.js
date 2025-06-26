// components/CartDrawer.js
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const toggleDrawer = () => setIsOpen(!isOpen);

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    updateStorage(updatedItems);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);
    
    setCartItems(updatedItems);
    updateStorage(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    ).toFixed(2);
  };

  if(typeof window === 'undefined') return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop with gradient effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-black/20 to-transparent backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleDrawer}
      />
      
      {/* Drawer Container */}
      <div 
        className={`absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Shopping Cart 🛍️
              <span className="text-sm ml-2 text-gray-500">
                ({cartItems.length} items)
              </span>
            </h2>
            <button 
              onClick={toggleDrawer}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items Section */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500">Your cart feels lonely...</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-white p-2 rounded border">
                    {/* <img 
                      src={item.image || '/placeholder-product.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    /> */}
                    <Image
                     src={item.image || '/placeholder-product.jpg'} 
                     alt={item.name} 
                     width={500} 
                     height={500}
                     className="w-full h-full object-contain"/>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Section */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-blue-600">${calculateTotal()}</span>
              </div>
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => alert('Redirecting to checkout...')}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleDrawer}
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 ${
          isOpen ? 'translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
        } transition-all duration-300 z-40`}
      >
        <div className="bg-blue-600 text-white p-3 rounded-l-lg shadow-lg flex items-center hover:bg-blue-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="ml-2 font-medium">{cartItems.length}</span>
        </div>
      </button>
    </div>,
    document.body
  );
};

export default CartDrawer;