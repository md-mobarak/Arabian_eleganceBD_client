

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
// import { animated, useSpring } from '@react-spring/web';


// const Navbar = () => {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const [cartCount, setCartCount] = useState(0);
//   const [animateCart, setAnimateCart] = useState(false);




//   // লোকালস্টোরেজ থেকে কার্টের সংখ্যা আপডেট করার ফাংশন
//   const updateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
//   };

//   // যখন কম্পোনেন্ট লোড হবে, তখন একবার চলবে
//   useEffect(() => {
//     updateCartCount();

//     // লোকালস্টোরেজ পরিবর্তন হলে ইভেন্ট লিস্টেনার সেট করা
//     const handleStorageChange = () => {
//       updateCartCount();
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const cartAnimation = useSpring({
//     transform: animateCart ? 'scale(1.2)' : 'scale(1)',
//     config: { tension: 300, friction: 10 },
//     onRest: () => setAnimateCart(false)
//   });

//   // Cart synchronization logic
//   useEffect(() => {
//     const getCartCount = () => {
//       try {
//         const cartData = localStorage.getItem('cart');
//         const cart = cartData ? JSON.parse(cartData) : [];
//         return cart.reduce((sum, item) => sum + item.quantity, 0);
//       } catch (error) {
//         console.error('Error reading cart:', error);
//         return 0;
//       }
//     };

//     const updateCartCount = () => {
//       const newCount = getCartCount();
//       if (newCount !== cartCount) {
//         setCartCount(newCount);
//         setAnimateCart(true);
//       }
//     };

//     // Initial load
//     updateCartCount();

//     // Event listeners
//     const handleStorageChange = (e) => {
//       if (e.key === 'cart') updateCartCount();
//     };

//     const handleCustomEvent = () => updateCartCount();

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('cartUpdated', handleCustomEvent);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('cartUpdated', handleCustomEvent);
//     };
//   }, []); // Empty dependency array ensures this runs once on mount

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "T-Shirts", path: "/t-shirts" },
//     { name: "Caps", path: "/caps" },
//     { name: "Panjabi", path: "/panjabi" },
//     { name: "Pants", path: "/pants" },
//     { name: "Sunnah Essential", path: "/sunnah-essential" },
//     { name: "Scarf", path: "/scarf" },
//     { name: "Accessories", path: "/accessories" },
//   ];

//   // Scroll handling
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setVisible(currentScrollY < lastScrollY || currentScrollY < 10);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className="relative">
   
//       <nav className={`backdrop-blur-md lg:p-4 p-2 bg-base-100 z-50 fixed w-full shadow-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        
     
        
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
//            <Link href="/">
//           <h1  className="font-poppins text-xl lg:text-4xl  font-bold text-gray-800">
         
//             <span className="text-black">Arabian </span>
//             <span className="text-orange-500">EleganceBD</span>
//           </h1>
      
//               {/* <FaUser size={20} className="hover:text-gray-600" /> */}
//             </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex space-x-6 font-medium">
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link 
//                   href={item.path} 
//                   className={`hover:text-gray-600 ${pathname === item.path ? "text-orange-600" : "text-gray-700"}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex items-center space-x-4">
//           <Link href="/auth/login">
//               <FaUser size={20} className="hover:text-gray-600" />
//             </Link>
//             <Link href="/cart" className="relative hover:text-gray-600">
//               <animated.div style={cartAnimation}>
//                 <FaShoppingCart size={20} />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//               </animated.div>
//             </Link>
           
//           </div>

//           {/* Mobile Icons */}
//           <div className="flex items-center gap-4 md:hidden">
//             <button 
//               onClick={() => setIsOpen(!isOpen)} 
//               className="text-gray-700"
//             >
//               <FaBars size={24} />
//             </button>
//             <Link href="/cart" className="relative hover:text-gray-600">
//               <animated.div style={cartAnimation}>
//                 <FaShoppingCart size={20} />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//               </animated.div>
//             </Link>
//           </div>
//         </div>
//          {/* searchbar */}
//       <div className="text-center">
//            <label className="input rounded-full w-1/2 border border-orange-500 focus:border-none">
//   <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <g
//       strokeLinejoin="round"
//       strokeLinecap="round"
//       strokeWidth="2.5"
//       fill="none"
//       stroke="currentColor"
//     >
//       <circle cx="11" cy="11" r="8"></circle>
//       <path d="m21 21-4.3-4.3"></path>
//     </g>
//   </svg>
//   <input type="search" className="grow" placeholder="Search Every Products" />
//   {/* <kbd className="kbd kbd-sm">⌘</kbd>
//   <kbd className="kbd kbd-sm">K</kbd> */}
// </label>
//       </div>

//         {/* Mobile Drawer */}
//         <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:hidden`}>
//           <div className="p-4">
//             <button 
//               onClick={() => setIsOpen(false)} 
//               className="absolute top-4 right-4 text-gray-700"
//             >
//               <FaTimes size={24} />
//             </button>
            
//             <ul className="mt-12 space-y-4 bg-white">
//               {navItems.map((item) => (
//                 <li key={item.name}>
//                   <Link
//                     href={item.path}
//                     onClick={() => setIsOpen(false)}
//                     className={`block py-2 rounded ${
//                       pathname === item.path
//                         ? "text-orange-600 bg-orange-50"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     {item.name}
//                   </Link>
//                 </li>
//               ))}
//               <li>
//                 <Link 
//                   href="/cart" 
//                   className="flex items-center gap-2 p-2 hover:bg-gray-100"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <FaShoppingCart className="w-5 h-5" />
//                   Cart {cartCount > 0 && <span className="bg-orange-600 text-white px-2 rounded-full">{cartCount}</span>}
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <div className="lg:pt-24 pt-20"></div>
//     </div>
//   );
// };

// export default Navbar;
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { animated, useSpring } from '@react-spring/web';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const moreMenuRef = useRef(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Navigation items
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

  // Primary items for main navigation
  const primaryItems = navItems.slice(0, 5);
  // Secondary items for "More" dropdown
  const secondaryItems = navItems.slice(5);

  // Cart animation spring
  const cartAnimation = useSpring({
    transform: animateCart ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
    onRest: () => setAnimateCart(false)
  });

  // Handle cart updates
  const updateCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
      if (count !== cartCount) {
        setCartCount(count);
        setAnimateCart(true);
      }
    } catch (error) {
      console.error("Cart parsing error:", error);
      setCartCount(0);
    }
  }, [cartCount]);

  // Initialize and listen for cart changes
  useEffect(() => {
    updateCartCount();
    
    const handleStorageChange = (e) => {
      if (e.key === "cart") updateCartCount();
    };

    const handleCartEvent = () => updateCartCount();
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartEvent);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartEvent);
    };
  }, [updateCartCount]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setVisible(currentScrollY < lastScrollY);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  };

  // Close "More" menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <nav 
        className={`backdrop-blur-md lg:py-4  bg-white/95 z-50 fixed w-full shadow-md transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar - Brand and Icons */}
          <div className="flex items-center justify-between py-3">
            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={24} />
            </button>

            {/* Brand Logo */}
            <Link 
              href="/" 
              className="flex items-center"
              aria-label="Home"
            >
              <div className="flex items-center">
                {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-2" /> */}
                <h1 className="font-poppins text-xl md:text-2xl font-bold">
                  <span className="text-gray-900">Arabian </span>
                  <span className="text-orange-500">EleganceBD</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex space-x-6 font-medium">
                {primaryItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`hover:text-orange-500 transition-colors px-2 py-1 ${
                        pathname === item.path 
                          ? "text-orange-600 font-semibold" 
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* More dropdown */}
                <li className="relative" ref={moreMenuRef}>
                  <button 
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex items-center px-2 py-1 ${
                      secondaryItems.some(item => pathname === item.path) 
                        ? "text-orange-600 font-semibold" 
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    More
                    <svg 
                      className={`ml-1 w-4 h-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isMoreOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10 overflow-hidden">
                      {secondaryItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`block py-3 px-4 hover:bg-orange-50 ${
                            pathname === item.path
                              ? "text-orange-600 font-medium bg-orange-50"
                              : "text-gray-700"
                          }`}
                          onClick={() => setIsMoreOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`hidden lg:flex items-center transition-all duration-300 ${
                isSearchFocused ? "w-64" : "w-44"
              }`}>
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                    aria-label="Search products"
                  />
                  <button 
                    type="submit"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    aria-label="Submit search"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>
              
              <Link 
                href="/auth/login" 
                className=" text-gray-700 hover:text-orange-500 transition-colors"
                aria-label="Account"
              >
                <FaUser size={20} />
              </Link>
              
              <Link 
                href="/cart" 
                className="relative text-gray-700 hover:text-orange-500 transition-colors"
                aria-label={`Cart, ${cartCount} items`}
              >
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

          {/* Search Bar - Mobile & Tablet */}
          <div className="pb-3 lg:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                aria-label="Search products"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside 
        className={`fixed z-50 top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main menu"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                <span className="text-black">Arabian </span>
                <span className="text-orange-500">EleganceBD</span>
              </h2>
              <button 
                aria-label="Close menu"
                className="text-gray-700 p-2"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  aria-label="Search products"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            
            <ul className="space-y-2 px-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block py-3 px-4 rounded-lg ${
                      pathname === item.path
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <Link 
                href="/auth/login" 
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                <FaUser size={18} />
                <span>Account</span>
              </Link>
              
              <Link 
                href="/cart" 
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 relative"
                onClick={() => setIsOpen(false)}
              >
                <FaShoppingCart size={18} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for content below navbar */}
      <div className="pt-26 " />
    </div>
  );
};

export default Navbar;