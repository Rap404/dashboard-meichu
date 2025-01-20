import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-auto md:w-full lg:w-full m-2">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-hitam dark:text-gray-400" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={value}
          onChange={onChange}
          className="pl-10 pr-2 py-2 bg-putihsc dark:bg-abutua border border-abumuda rounded-lg text-hitam dark:text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren"
        />
        <div className="absolute md:hidden lg:hidden right-3 top-1/2 transform -translate-y-1/2">
          <p className="text-kuning text-xs">Search</p>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
