import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";

const FormAuthentication = ({
  error,
  FormData,
  showPass,
  func,
  changeHandler,
  data,
}) => {
  return (
    <div className="rounded-md space-y-5">
      {FormData.map((field, index) => (
        <div className="flex flex-col relative" key={index}>
          <label htmlFor="" className="dark:text-white">
            {field.label}
          </label>
          <input
            type={showPass ? "text" : field.type}
            name={field.name}
            value={data[field.name] || ""}
            onChange={changeHandler}
            placeholder={field.placeholder}
            className="mt-1 block w-full rounded-lg border dark:bg-abutua dark:border-abumuda text-hitam dark:text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren py-2 px-3"
          />
          {field.type == "password" ? (
            <button
              type="button"
              onClick={func}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPass ? (
                <EyeOffIcon className="h-5 w-5 mt-7 text-oren hover:text-oren active:text-oren transition-colors duration-150" />
              ) : (
                <EyeIcon className="h-5 w-5 mt-7 dark:text-white" />
              )}
            </button>
          ) : (
            ""
          )}
          {error && (
            <span className="text-red-600 text-xs">
              username or password doesn't match
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormAuthentication;
