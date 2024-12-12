import React from "react";

const Button = ({ value = "", func, name }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={func}
        value={value}
        className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-xs font-medium rounded-lg text-white bg-abutua hover:bg-abumuda focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
