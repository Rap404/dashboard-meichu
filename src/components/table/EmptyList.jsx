import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EmptyList = ({ page }) => {
  return (
    <div className="me-6 mt-6 items-center justify-center flex flex-col bg-zinc-900 border border-secondary rounded-2xl h-56">
      <div className=" text-white items-center justify-center">
        <XMarkIcon className="size-12 bg-abutua rounded-full p-2" />
      </div>
      <div className="text-white items-center justify-center mt-3">
        <span className="p-2 text-white">Empty {page}</span>
      </div>
    </div>
  );
};

export default EmptyList;
