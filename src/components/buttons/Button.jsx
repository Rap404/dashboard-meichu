import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Button = ({ func, name }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="submit"
        onClick={func}
        className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-xs font-medium rounded-lg text-white bg-abutua hover:bg-abumuda focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
