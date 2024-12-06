import React from "react";
import profile from ".././assets/photo-profile2.svg";
import { useNavigate } from "react-router-dom";
import {
  Bars2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { assets } from "../assets/Assets";

const Navbar = ({ toggleSidebar, isSideBarOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-w-full overflow-x-hidden">
      <nav className="w-full flex justify-between bg-zinc-900 opacity-90 min-h-4 px-2 border-b-2 border-abutua py-2 lg:py-0">
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
          <img src={assets.logo} alt="" className="hidden lg:block w-28" />
        </div>
        <div
          className="flex items-center px-6 cursor-pointer"
          onClick={() => navigate("/profile ")}
        >
          <UserCircleIcon className="size-10 text-white hover:text-oren" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
