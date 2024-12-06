// src/layouts/BasicLayout.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} isSideBarOpen={isSideBarOpen} />
      <div className="flex flex-grow">
        <Sidebar setIsOpen={toggleSidebar} isOpen={isSideBarOpen} />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BasicLayout;
