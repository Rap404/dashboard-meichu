import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EmptyList = ({ page }) => {
  return (
    <div className="me-6 mt-6 items-center justify-center flex flex-col dark:bg-zinc-900 border-2 dark:border-secondary rounded-2xl h-56">
      <div className=" dark:text-white items-center justify-center">
        <XMarkIcon className="size-12 bg-putihtrd dark:bg-abutua rounded-full p-2" />
      </div>
      <div className="items-center justify-center mt-3">
        <span className="p-2 dark:text-white">Empty {page}</span>
      </div>
    </div>
  );
};

export default EmptyList;
