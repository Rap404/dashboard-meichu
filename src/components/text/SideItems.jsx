import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideItems = ({ page, icon, text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const handleActiveItems = () => {
    if (location.pathname === page) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    handleActiveItems();
  }, []);

  return (
    <div className="" onClick={() => navigate(`${page}`)}>
      <a
        href={page}
        className="group flex items-center w-75 h-10 p-2 hover:bg-zinc-900 rounded-lg transition-colors"
      >
        <span
          className={`size-5 text-abumuda group-hover:text-kuning transition-colors ${
            isActive ? "text-kuning" : ""
          }`}
        >
          {icon}
        </span>
        <span
          className={`items-center ps-3 text-sm group-hover:text-kuning transition-colors ${
            isActive ? "text-kuning" : ""
          }`}
        >
          {text}
        </span>
      </a>
    </div>
  );
};

export default SideItems;
