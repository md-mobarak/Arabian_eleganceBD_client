
// export default Navbar;
'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch, FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { animated, useSpring } from '@react-spring/web';
import NavModal from "./NavModal";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const moreMenuRef = useRef(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user') || 'null';
    setUser(userData);
    
    // Listen for storage events to update user state
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const newUser = JSON.parse(user)
  console.log(newUser)
  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "T-Shirts", path: "/shirts" },
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure";
    setUser(null);
    setIsUserMenuOpen(false);
    router.push('/');
  };

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

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchModalOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Close "More" menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchModalOpen(true);
    }
  };

  // Open search modal when search input is clicked
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  // console.log(user)

  return (
    <div className="relative">
      <NavModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
      
      <nav 
        className={`backdrop-blur-md lg:py-4 bg-white/95 z-40 fixed w-full shadow-md transition-transform duration-300 ${
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
                <h1 className="font-sans text-xl md:text-2xl font-bold tracking-wide">
                  <span className="text-gray-900">Arabian </span>
                  <span className="text-orange-500">EleganceBD</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex space-x-1 font-medium items-center">
                {primaryItems.map((item) => (
                  <li key={item.name} className="flex items-center">
                    <Link
                      href={item.path}
                      className={`hover:text-orange-500 transition-colors px-3 py-2 ${
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
                    className={`flex items-center px-3 py-2 ${
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
              <div className="hidden lg:flex items-center w-44">
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleSearchClick}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent cursor-pointer"
                    aria-label="Search products"
                    readOnly
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
              
              {/* User dropdown or login link */}
              <div className="relative" ref={userMenuRef}>
                { newUser ? (
                  <div 
                    className="flex items-center gap-1 cursor-pointer group"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    { newUser.avatar ? (
                      <img 
                        src={ newUser.avatar} 
                        alt="User avatar" 
                        className="w-8 h-8 rounded-full object-cover border-2 border-orange-200"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-600 text-2xl" />
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-orange-500">
                      { newUser?.name?.split(' ')[0]}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    
                    {/* User dropdown menu */}
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{ newUser.name}</p>
                          <p className="text-xs text-gray-500 truncate">{ newUser.email}</p>
                        </div>
                        
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser className="mr-3 text-gray-500" />
                          <span>My Profile</span>
                        </Link>
                        
                        {( newUser.role === 'admin' ||  newUser.role === 'manager') && (
                          <Link
                            href="/dashboard"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FaTachometerAlt className="mr-3 text-gray-500" />
                            <span>Dashboard</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 border-t border-gray-100"
                        >
                          <FaSignOutAlt className="mr-3 text-gray-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href="/auth/login" 
                    className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    {/* <FaUser size={20} /> */}
                    <span className="hidden md:inline text-sm font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar - Mobile & Tablet */}
          <div className="pb-3 lg:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={handleSearchClick}
                placeholder="Search all products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent cursor-pointer"
                aria-label="Search products"
                readOnly
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
              <h2 className="font-sans text-xl font-bold tracking-wide">
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
                  onClick={handleSearchClick}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent cursor-pointer"
                  aria-label="Search products"
                  readOnly
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
              
              {/* User menu items for mobile */}
              { newUser && (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className={`block py-3 px-4 rounded-lg ${
                        pathname === '/profile'
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      My Profile
                    </Link>
                  </li>
                  {( newUser.role === 'admin' ||  newUser.role === 'manager') && (
                    <li>
                      <Link
                        href="/dashboard"
                        className={`block py-3 px-4 rounded-lg ${
                          pathname === '/dashboard'
                            ? "bg-orange-50 text-orange-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left block py-3 px-4 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              { newUser ? (
                <div className="flex items-center gap-2">
                  { newUser.avatar ? (
                    <img 
                      src={ newUser.avatar} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-orange-200"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-600 text-2xl" />
                  )}
                  <span className="text-sm font-medium">{ newUser?.name?.split(' ')[0]}</span>
                </div>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser size={18} />
                  <span>Account</span>
                </Link>
              )}
              
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
      <div className="lg:pt-26 md:pt-26 pt-32 " />
    </div>
  );
};

export default Navbar;