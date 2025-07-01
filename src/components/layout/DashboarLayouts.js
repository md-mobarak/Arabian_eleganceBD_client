

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
