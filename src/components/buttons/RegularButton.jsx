import React from "react";

const RegularButton = ({ value = "", func, name }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={func}
        value={value}
        className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-xs font-medium rounded-lg text-white bg-oren hover:bg-kuning focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {name}
      </button>
    </div>
  );
};

export default RegularButton;
