import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";

const FormAuthentication = ({
  FormData,
  showPass,
  func,
  changeHandler,
  data,
}) => {
  return (
    <div className="rounded-md shadow-sm space-y-5">
      {FormData.map((field, index) => (
        <div className="flex flex-col relative" key={index}>
          <label htmlFor="" className="text-white">
            {field.label}
          </label>
          <input
            type={showPass ? "text" : field.type}
            name={field.name}
            value={data[field.name] || ""}
            onChange={changeHandler}
            placeholder={field.placeholder}
            className="bg-gray-700 rounded-md text-white border border-secondary focus:outline-none focus:border-kuning focus:ring-kuning p-2 text-sm"
          />
          {field.type == "password" ? (
            <button
              type="button"
              onClick={func}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPass ? (
                <EyeIcon className="h-5 w-5  mt-5 text-white" />
              ) : (
                <EyeOffIcon className="h-5 w-5 mt-5 text-oren hover:text-oren active:text-oren transition-colors duration-150" />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default FormAuthentication;
