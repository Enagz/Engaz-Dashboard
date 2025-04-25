import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import RightSidebar from "../Sidebar/RightSidebar/RightSidebar";
// import LeftSidebar from "../Sidebar/Left Sidebar/LeftSidebar";
import Header from "../Header/Header";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout flex ">
      {/* <LeftSidebar /> */}

      <div className="flex-1 flex flex-col">
        <button className="md:hidden p-4" onClick={toggleSidebar}>
          <Menu />
        </button>
        <Header />

        <div className="main-content">
          <Outlet />
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64">
        <RightSidebar isOpen={true} onClose={toggleSidebar} />
      </div>

      {/* Sidebar for mobile */}
      <div className="md:hidden">
        {isSidebarOpen && (
          <div className="absolute z-50 w-64 h-full shadow-lg">
            <RightSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
