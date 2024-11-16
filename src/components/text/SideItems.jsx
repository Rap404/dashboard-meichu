import React from "react";
import { useNavigate } from "react-router-dom";

const SideItems = ({ page, icon, text }) => {
  const navigate = useNavigate();
  return (
    <div className="" onClick={() => navigate(`${page}`)}>
      <a
        href={page}
        className="group flex items-center w-75 h-10 p-2 hover:bg-zinc-900 rounded-lg transition-colors"
      >
        <span className="size-5 text-abumuda group-hover:text-kuning transition-colors">
          {icon}
        </span>
        <span className="items-center ps-3 text-sm group-hover:text-kuning transition-colors">
          {text}
        </span>
      </a>
    </div>
  );
};

export default SideItems;
