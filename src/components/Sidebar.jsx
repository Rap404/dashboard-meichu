import React, { useState } from "react";
import {
  BeakerIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import SideItems from "./text/SideItems";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay untuk mobile ketika sidebar terbuka */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        >
          x
        </div>
      )}
      {/* sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-hitam text-white z-50  md:z-0 lg:z-0
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <aside className="flex flex-col w-72 px-6 py-7">
          {/* Navigasi */}
          <nav className="flex flex-col flex-grow gap-3">
            <SideItems icon={<HomeIcon />} page={"/"} text={"Dashboard"} />
            <SideItems
              icon={<RectangleStackIcon />}
              page={"/categories"}
              text={"Categories"}
            />
            <SideItems
              icon={<PencilSquareIcon />}
              page={"/products"}
              text={"Products"}
            />
            <SideItems
              icon={<CalendarDaysIcon />}
              page={"/events"}
              text={"Events"}
            />
            <SideItems
              icon={<UserGroupIcon />}
              page={"/ambassadors"}
              text={"Ambassadors"}
            />
            <SideItems
              icon={<ChatBubbleLeftRightIcon />}
              page={"/requests"}
              text={"Requests"}
            />
            <SideItems
              icon={<UserCircleIcon />}
              page={"/users"}
              text={"Users"}
            />
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
