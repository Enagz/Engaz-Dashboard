import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import RightSidebar from "../Sidebar/RightSidebar/RightSidebar";
// import LeftSidebar from "../Sidebar/Left Sidebar/LeftSidebar";
import Header from "../Header/Header";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  return (
    <SidebarProvider>
      <Sidebar side="left">
        <RightSidebar />
      </Sidebar>

      <div className="grow flex flex-col">
        <SidebarTrigger className="md:hidden" />
        <Header />

        <div className="main-content px-4 md:px-10">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
