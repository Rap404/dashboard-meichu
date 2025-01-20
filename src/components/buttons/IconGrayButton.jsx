import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

const IconGrayButton = ({ icon, text, func }) => {
  return (
    <button
      className="dark:bg-abutua rounded-md h-9 border border-2-abumuda dark:border-abumuda flex items-center px-2 group gap-2"
      onClick={func}
    >
      <span className="size-5 text-abumuda group-hover:text-oren transition-colors duration-200">
        {icon}
      </span>
      <span className="hidden lg:block text-hitam dark:text-white text-sm group-hover:text-oren transition-colors duration-200">
        {text}
      </span>
    </button>
  );
};

export default IconGrayButton;
