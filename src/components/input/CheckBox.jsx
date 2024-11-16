import { Check, CheckCheck } from "lucide-react";
import React, { useState } from "react";

const CheckBox = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`w-5 h-5 rounded cursor-pointer border transition-colors duration-200 flex items-center justify-center
                    ${
                      checked
                        ? "bg-amber-500 border-amber-500"
                        : "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
                    }`}
    >
      {checked && <Check size={14} className="text-white" />}
    </div>
  );
};

export default CheckBox;
