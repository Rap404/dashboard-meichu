import { Check } from "lucide-react";
import React from "react";

const RadioButton = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`w-5 h-5 rounded-full cursor-pointer border transition-colors duration-200 p-2 flex border-abumuda items-center justify-center
                    ${
                      checked
                        ? "bg-white dark:bg-zinc-800 border-oren"
                        : "bg-putihtrd dark:bg-zinc-800 border-2 dark:border-zinc-700 hover:border-zinc-600"
                    }`}
    >
      {checked && <div className="bg-oren p-1.5  rounded-full"></div>}
    </div>
  );
};

export default RadioButton;
