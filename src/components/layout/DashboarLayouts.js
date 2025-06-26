
// import { useState } from 'react';
// import { Bell, Menu } from 'lucide-react';

// import DashboardNav from './DashboardNav';


// export default function DashboarLayouts({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     < >
//     <nav>
//       {/* dashboard navabr  */}
//       <DashboardNav></DashboardNav>
//     </nav>
//       <main>
//         {children}
//       </main>
//     </>
//   );
// }



// import DashboardNav from "./DashboardNav";
// import DashboardSidebar from "./DashboardSidebar";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex">
//       {/* <Sidebar /> */}
//       <DashboardSidebar></DashboardSidebar>
//       <div className="ml-64 w-full">
//       <DashboardNav></DashboardNav>
//         {/* <Header /> */}
//         <main className="p-6 mt-16">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
"use client";
import React, { useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} w-full`}>
        {/* Navbar */}
        <DashboardNav toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="p-6 mt-16">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
