import React from "react";
import { useNavigate } from "react-router-dom";

const RegularButton = ({ func, name }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="submit"
        onClick={func}
        className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-xs font-medium rounded-lg text-white bg-oren hover:bg-kuning focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {name}
      </button>
    </div>
  );
};

export default RegularButton;
