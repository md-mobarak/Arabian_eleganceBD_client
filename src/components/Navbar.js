

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import { animated, useSpring } from '@react-spring/web';


const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);




  // লোকালস্টোরেজ থেকে কার্টের সংখ্যা আপডেট করার ফাংশন
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  // যখন কম্পোনেন্ট লোড হবে, তখন একবার চলবে
  useEffect(() => {
    updateCartCount();

    // লোকালস্টোরেজ পরিবর্তন হলে ইভেন্ট লিস্টেনার সেট করা
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const cartAnimation = useSpring({
    transform: animateCart ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
    onRest: () => setAnimateCart(false)
  });

  // Cart synchronization logic
  useEffect(() => {
    const getCartCount = () => {
      try {
        const cartData = localStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      } catch (error) {
        console.error('Error reading cart:', error);
        return 0;
      }
    };

    const updateCartCount = () => {
      const newCount = getCartCount();
      if (newCount !== cartCount) {
        setCartCount(newCount);
        setAnimateCart(true);
      }
    };

    // Initial load
    updateCartCount();

    // Event listeners
    const handleStorageChange = (e) => {
      if (e.key === 'cart') updateCartCount();
    };

    const handleCustomEvent = () => updateCartCount();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomEvent);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "T-Shirts", path: "/t-shirts" },
    { name: "Caps", path: "/caps" },
    { name: "Panjabi", path: "/panjabi" },
    { name: "Pants", path: "/pants" },
    { name: "Sunnah Essential", path: "/sunnah-essential" },
    { name: "Scarf", path: "/scarf" },
    { name: "Accessories", path: "/accessories" },
  ];

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative">
      <nav className={`backdrop-blur-md lg:p-4 p-2 bg-base-100 z-50 fixed w-full shadow-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-poppins text-xl font-bold text-gray-800">
            <span className="text-black">Arabian </span>
            <span className="text-orange-500">EleganceBD</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className={`hover:text-gray-600 ${pathname === item.path ? "text-orange-600" : "text-gray-700"}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth/login">
              <FaUser size={20} className="hover:text-gray-600" />
            </Link>
            <Link href="/cart" className="relative hover:text-gray-600">
              <animated.div style={cartAnimation}>
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </animated.div>
            </Link>
           
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-700"
            >
              <FaBars size={24} />
            </button>
            <Link href="/cart" className="relative hover:text-gray-600">
              <animated.div style={cartAnimation}>
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </animated.div>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:hidden`}>
          <div className="p-4">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            
            <ul className="mt-12 space-y-4 bg-white">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 rounded ${
                      pathname === item.path
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/cart" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="w-5 h-5" />
                  Cart {cartCount > 0 && <span className="bg-orange-600 text-white px-2 rounded-full">{cartCount}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="lg:pt-24 pt-20"></div>
    </div>
  );
};

export default Navbar;