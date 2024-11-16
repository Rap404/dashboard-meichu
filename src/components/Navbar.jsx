import React from "react";
import profile from ".././assets/photo-profile2.svg";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between bg-zinc-900 opacity-90 min-h-4 p-2 border-b-2 border-abutua">
      <div className="flex items-center px-6 ">
        <span className="text-white font-bold text-lg w-10mr-2">Dashboard</span>
      </div>
      <div
        className="flex items-center px-6"
        onClick={() => navigate("/login")}
      >
        <UserCircleIcon className="size-10 text-white hover:text-oren" />
      </div>
    </nav>
  );
};

export default Navbar;
