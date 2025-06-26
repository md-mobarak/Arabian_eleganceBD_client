// import React from 'react'
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoNotificationsCircleSharp } from "react-icons/io5";
// import { LuSunMoon } from "react-icons/lu";

// import { FaRegUser } from "react-icons/fa";
// export default function DashboardNav() {
//   return (
  
// <div className='flex justify-between bg-green-200'>
// <div><GiHamburgerMenu /></div>
//  <div className='flex justify-around gap-x-10 text-4xl px-16 pt-5'>
//  <LuSunMoon />
//     <IoNotificationsCircleSharp />
//     <FaRegUser />
//  </div>


// </div>
//   )
// }
// import React from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaBell } from "react-icons/fa";
// import { MdLanguage } from "react-icons/md";
// import Image from "next/image";

// export default function DashboardNav({ toggleSidebar }) {
//   return (
//     <header className="bg-white shadow p-4 fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 h-16">
//       {/* Left - Hamburger Menu */}
//       <button onClick={toggleSidebar} className="text-green-600 text-2xl">
//         <RxHamburgerMenu />
//       </button>

//       {/* Right - Language, Notifications, Profile */}
//       <div className="flex items-center space-x-4">
//         {/* Language Selector */}
//         <div className="flex items-center space-x-1 cursor-pointer">
//           <MdLanguage className="text-blue-500 text-lg" />
//           <span className="text-sm font-medium">ENGLISH</span>
//         </div>

//         {/* Notifications */}
//         <div className="relative cursor-pointer">
//           <FaBell className="text-green-500 text-lg" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//             2
//           </span>
//         </div>

//         {/* Profile Image */}
//         <Image
//           src="/profile.jpg" // Replace with actual profile image
//           alt="Profile"
//           width={32}
//           height={32}
//           className="rounded-full"
//         />
//       </div>
//     </header>
//   );
// }

"use client";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import Image from "next/image";

export default function DashboardNav({ toggleSidebar }) {
  return (
    <header className="bg-white shadow p-4 fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 h-16 z-10">
      {/* Left - Hamburger Menu */}
      <button onClick={toggleSidebar} className="text-orange-600 text-2xl">
        <RxHamburgerMenu />
      </button>

      {/* Right - Language, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <MdLanguage className="text-blue-500 text-lg" />
          <span className="text-sm font-medium">ENGLISH</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-green-500 text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        {/* Profile Image */}
        <Image
          src="/profile.jpg" // Replace with actual profile image
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
