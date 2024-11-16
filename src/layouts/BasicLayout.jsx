// src/layouts/BasicLayout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = ({ children }) => {
  return (
    <div className="flex-row">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BasicLayout;
