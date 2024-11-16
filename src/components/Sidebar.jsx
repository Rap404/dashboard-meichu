import React from "react";
import {
  BeakerIcon,
  CalendarDaysIcon,
  HomeIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import SideItems from "./text/SideItems";
import { User2 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-hitam text-white">
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
          <SideItems icon={<UserCircleIcon />} page={"/users"} text={"Users"} />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
