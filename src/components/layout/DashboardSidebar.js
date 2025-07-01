"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBox, FaUsers, FaClipboardList, FaCog, FaStore } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaUsersGear } from "react-icons/fa6";
import { useRouter } from "next/router";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DashboardSidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();

  const isActive = (route) => {
    return pathname === route ? "bg-orange-500 text-white" : "hover:bg-gray-200";
  };

  const router = useRouter();

  const handleLogout = () => {
    // ক্লায়েন্ট সাইড থেকে টোকেন এবং ইউজার ডেটা মুছে ফেলা
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // refreshToken কুকি ক্লিয়ার করার জন্য সেট করা (expired)
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure";

    // যদি axios default header থাকে, তা রিমুভ করুন (যদি প্রয়োজন হয়)
    // axios.defaults.headers.common['Authorization'] = '';

    // সফল লগআউটের বার্তা দেখান এবং লগইন পেজে রিডাইরেক্ট করুন
    toast.success('Logout successful!');
    router.push('/');
  };

  return (
    <div
      className={`h-screen bg-white text-gray-900 shadow-lg fixed transition-all duration-300 overflow-y-auto ${
        isOpen ? "w-64 p-5" : "w-16 p-3"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h2 className="text-xl font-bold">Dashtar</h2>}
        <RxHamburgerMenu
          onClick={toggleSidebar}
          className="text-2xl cursor-pointer transition-transform duration-300"
        />
      </div>

      <ul className="space-y-3">
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard")}`}
          >
            <FaClipboardList className="text-lg" />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/alluser"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/alluser")}`}
          >
            <FaUsersGear className="text-lg" />
            {isOpen && <span className="ml-3">Our Stuf</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/manageProducts"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/manageProducts")}`}
          >
            <FaBox className="text-lg" />
            {isOpen && <span className="ml-3">Product Management</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/category"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/category")}`}
          >
            <FaUsers className="text-lg" />
            {isOpen && <span className="ml-3">Category</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/orders"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/orders")}`}
          >
            <FaClipboardList className="text-lg" />
            {isOpen && <span className="ml-3">Orders</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/manageProfile"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/manageProfile")}`}
          >
            {/* <FaStore className="text-lg" /> */}
            <FaUserEdit   className="text-lg"/>
            {isOpen && <span className="ml-3">Profile</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/settings")}`}
          >
            <FaCog className="text-lg" />
            {isOpen && <span className="ml-3">Settings</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/store"
            className={`flex items-center p-3 rounded-lg ${isActive("/dashboard/store")}`}
          >
            <FaStore className="text-lg" />
            {isOpen && <span className="ml-3">Online Store</span>}
          </Link>
        </li>
        
      </ul>

      <div className="mt-6">
        <button onClick={handleLogout}  className="w-full flex items-center p-3 bg-orange-500  text-white rounded-lg hover:bg-orange-400">
          <IoIosLogOut className="text-lg" />
          {isOpen && <span className="ml-3">Log Out</span>}
        </button>
      </div>
    </div>
  );
}