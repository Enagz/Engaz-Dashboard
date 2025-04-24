import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../Sidebar/RightSidebar/RightSidebar'; 
import LeftSidebar from '../Sidebar/Left Sidebar/LeftSidebar'; 
import Header from '../Header/Header'; 

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout flex">
      {/* <LeftSidebar /> */}

      <div className="flex-1 flex flex-col">
        {/* <Header /> */}

        <div className="main-content">
          {children || <Outlet />}
        </div>
      </div>

      {/* <RightSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      >
        {null}
      </RightSidebar> */}
    </div>
  );
};

export default DashboardLayout;





