import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitButton = ({ name = "Sign in", func }) => {
  return (
    <div>
      <button
        type="button"
        onClick={func}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-oren hover:bg-kuning focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {name}
      </button>
    </div>
  );
};

export default SubmitButton;
