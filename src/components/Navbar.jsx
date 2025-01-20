import React, { useContext, useEffect, useState } from "react";
import profile from ".././assets/photo-profile2.svg";
import { useNavigate } from "react-router-dom";
import { Bars2Icon, MoonIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { assets } from "../assets/Assets";
import { useTheme } from "../lib/ThemeContext";

const Navbar = ({ toggleSidebar, isSideBarOpen, image }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="w-full min-w-full overflow-x-hidden">
      <nav className="w-full flex justify-between bg-putihsc dark:bg-secondary opacity-90 min-h-4 px-2 border-b-2 dark:border-abutua py-2 lg:py-0">
        <div className="flex items-center px-6">
          <button
            onClick={() => toggleSidebar()}
            className="lg:hidden text-white hover:text-oren focus:outline-none"
          >
            {isSideBarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars2Icon className="h-6 w-6" />
            )}
          </button>
          <button className="" onClick={() => navigate("/")}>
            <img src={assets.logo} alt="" className="hidden lg:block w-28" />
          </button>
        </div>
        <div className="flex items-center px-6 justify-between gap-3">
          <button
            className="text-hitam dark:text-white mt-1"
            onClick={toggleTheme}
          >
            <MoonIcon className="w-7" />
          </button>
          <button
            className="max-w-10 max-h-10 rounded-full group"
            onClick={() => navigate("/profile ")}
          >
            <img
              className="rounded-full group-hover:opacity-80"
              src={image || profile}
              alt=""
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
