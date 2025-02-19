import React from "react";
import {
  ArchiveBoxIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  ServerStackIcon,
  UserCircleIcon,
  UserGroupIcon,
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
        className={`absolute lg:static top-0 left-0 h-1  z-50 md:z-50 lg:z-0 lg:z-
          transition-transform duration-300 ease-in-out lg:translate-x-0 overscroll-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <aside className="flex flex-col w-72 px-6 py-7 min-h-screen bg-white dark:bg-hitam text-hitam dark:text-white">
          {/* Navigasi */}
          <nav className="flex flex-col flex-grow gap-3">
            <SideItems icon={<HomeIcon />} page={"/"} text={"Dashboard"} />
            <SideItems
              icon={<PencilSquareIcon />}
              page={"/products"}
              text={"Products"}
            />
            <SideItems
              icon={<RectangleStackIcon />}
              page={"/categories"}
              text={"Categories"}
            />
            <SideItems
              icon={<ArchiveBoxIcon />}
              page={"/content"}
              text={"Content"}
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
              icon={<ServerStackIcon />}
              page={"/custom-categories"}
              text={"Request categories"}
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
