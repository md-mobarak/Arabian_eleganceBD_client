"use client";
import React, { useState, useRef, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBell, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";

export default function DashboardNav({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure";
    toast.success('Logout successful!');
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 h-16 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <button 
          onClick={toggleSidebar} 
          className="text-gray-600 hover:text-gray-900 text-2xl transition-colors"
          aria-label="Toggle sidebar"
        >
          <RxHamburgerMenu />
        </button>
        
        <button 
          onClick={() => router.push('/')} 
          className="flex items-center bg-green-500 hover:bg-green-600 rounded-full text-white px-2 py-1 md:px-4 md:py-2 transition-all duration-200"
        >
          <span className="text-xs md:text-sm font-medium">← Back to home</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="flex items-center space-x-1 cursor-pointer group">
          <MdLanguage className="text-blue-500 group-hover:text-blue-700 text-xl transition-colors" />
          <span className="hidden sm:block text-sm font-medium text-blue-500 group-hover:text-blue-700 transition-colors">
            ENGLISH
          </span>
        </div>

        <div className="relative cursor-pointer group">
          <FaBell className="text-gray-500 group-hover:text-green-600 text-lg transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Admin User
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <FiChevronDown 
              className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-orange-500 truncate">admin@example.com</p>
              </div>
              
              <button 
                onClick={() => router.push("/dashboard/manageProfile")}
                className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <FaUser className="mr-3 text-gray-500" />
                <span>My Profile</span>
              </button>
              
              <button 
                onClick={() => router.push("/dashboard/settings")}
                className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <FaCog className="mr-3 text-gray-500" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-gray-100"
              >
                <FaSignOutAlt className="mr-3 text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}